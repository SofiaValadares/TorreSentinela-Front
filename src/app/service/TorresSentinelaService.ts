import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TorreSentinelaData } from '../model/TorreSentinela';
import { TorreDetalhesHistoryService } from './TorreDetalhesHistoryService';

@Injectable({
  providedIn: 'root'
})
export class TorresSentinelaService {
  listaTorres: WritableSignal<TorreSentinelaData[]> =
    signal<TorreSentinelaData[]>([]);

  private pollingTimers = new Map<string, number>();

  constructor(
    private http: HttpClient,
    private detalhesHistory: TorreDetalhesHistoryService
  ) {}

  addTorre(torre: TorreSentinelaData): void {
    this.listaTorres.update(listaAtual => [...listaAtual, torre]);

    // primeira leitura: só registra estado inicial
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
                    tempoSemChuva: res.tempo_sem_chuva,
                    erroCode: undefined // limpa erro se voltar ao normal
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
          error: (err: HttpErrorResponse) => {
            const erroMessage = this.formatError(err);
            console.error(
              'Erro ao buscar tempo_sem_chuva da torre',
              torreIP,
              erroMessage
            );

            // Atualiza só o erro na torre, sem mexer no tempoSemChuva
            this.listaTorres.update(lista =>
              lista.map(torre => {
                if (torre.torreIP === torreIP) {
                  return {
                    ...torre,
                    erroCode: erroMessage
                  };
                }
                return torre;
              })
            );

            // 👉 Se quiser registrar no histórico mesmo com erro,
            // você pode chamar aqui:
            // const torre = this.listaTorres().find(t => t.torreIP === torreIP);
            // if (torre) this.detalhesHistory.registrarLeituraTorre(torre);
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

  // ---------- helpers ----------

  private formatError(err: HttpErrorResponse | any): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'Falha na conexao.';
      }
      return `Erro HTTP ${err.status}'}`;
    }

    return 'Erro inesperado ao consultar torre.';
  }
}
