import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TorreSentinelaData } from '../model/TorreSentinela';
import {TorreDetalhesHistoryService} from './TorreDetalhesHistoryService';

@Injectable({
  providedIn: 'root'
})
export class TorresSentinelaService {
  listaTorres: WritableSignal<TorreSentinelaData[]> = signal<TorreSentinelaData[]>([]);

  private pollingTimers = new Map<string, number>();

  constructor(
    private http: HttpClient,
    private detalhesHistory: TorreDetalhesHistoryService
  ) {}

  addTorre(torre: TorreSentinelaData): void {
    this.listaTorres.update(listaAtual => [...listaAtual, torre]);

    this.detalhesHistory.registrarLeituraTorre(torre);

    this.startPollingTorre(torre.torreIP);
  }

  removeTorre(torreIP: string): void {
    this.listaTorres.update(listaAtual =>
      listaAtual.filter(t => t.torreIP !== torreIP)
    );

    this.detalhesHistory.removerTorrePorIp(torreIP);

    this.stopPollingTorre(torreIP);
  }

  private startPollingTorre(torreIP: string): void {
    if (this.pollingTimers.has(torreIP)) {
      return;
    }

    const intervalId = window.setInterval(() => {
      this.http
        .get<{ tempo_sem_chuva: number }>(
          `http://127.0.0.1:1880/chuva/${torreIP}`
        )
        .subscribe({
          next: (res) => {
            let torreAtualizada: TorreSentinelaData | null = null;

            this.listaTorres.update(lista =>
              lista.map(torre => {
                if (torre.torreIP === torreIP) {
                  torreAtualizada = {
                    ...torre,
                    tempoSemChuva: res.tempo_sem_chuva
                  };
                  return torreAtualizada;
                }
                return torre;
              })
            );

            if (torreAtualizada) {
              this.detalhesHistory.registrarLeituraTorre(torreAtualizada);
            }
          },
          error: (err) => {
            console.error('Erro ao buscar tempo_sem_chuva da torre', torreIP, err);
          }
        });
    }, 2000);

    this.pollingTimers.set(torreIP, intervalId);
  }

  private stopPollingTorre(torreIP: string): void {
    const intervalId = this.pollingTimers.get(torreIP);
    if (intervalId != null) {
      clearInterval(intervalId);
      this.pollingTimers.delete(torreIP);
    }
  }

  stopAllPolling(): void {
    this.pollingTimers.forEach((id) => clearInterval(id));
    this.pollingTimers.clear();
  }
}
