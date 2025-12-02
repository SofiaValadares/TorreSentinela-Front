import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TorreSentinelaData {
  torreIP: string;
  latitude: number;
  longitude: number;
  tempoSemChuva?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TorresSentinelaService {
  // lista de torres
  listaTorres: WritableSignal<TorreSentinelaData[]> = signal<TorreSentinelaData[]>([]);

  // guarda os intervalos ativos (um por torre)
  private pollingTimers = new Map<string, number>();

  constructor(private http: HttpClient) {}

  addTorre(torre: TorreSentinelaData): void {
    this.listaTorres.update(listaAtual => [...listaAtual, torre]);

    // já começa a chamar a API dessa torre a cada 2 segundos
    this.startPollingTorre(torre.torreIP);
  }

  removeTorre(torreIP: string): void {
    this.listaTorres.update(listaAtual =>
      listaAtual.filter(t => t.torreIP !== torreIP)
    );
    this.stopPollingTorre(torreIP);
  }

  /** 🔄 Inicia o polling da API para uma torre específica */
  private startPollingTorre(torreIP: string): void {
    // se já tiver um timer pra essa torre, não cria outro
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
            this.listaTorres.update(lista =>
              lista.map(torre =>
                torre.torreIP === torreIP
                  ? { ...torre, tempoSemChuva: res.tempo_sem_chuva }
                  : torre
              )
            );
          },
          error: (err) => {
            console.error('Erro ao buscar tempo_sem_chuva da torre', torreIP, err);
          }
        });
    }, 2000);

    this.pollingTimers.set(torreIP, intervalId);
  }

  /** 🧹 Para o polling de uma torre específica */
  private stopPollingTorre(torreIP: string): void {
    const intervalId = this.pollingTimers.get(torreIP);
    if (intervalId != null) {
      clearInterval(intervalId);
      this.pollingTimers.delete(torreIP);
    }
  }

  /** 🧹 Para tudo (se você quiser chamar ao deslogar, por exemplo) */
  stopAllPolling(): void {
    this.pollingTimers.forEach((id) => clearInterval(id));
    this.pollingTimers.clear();
  }
}
