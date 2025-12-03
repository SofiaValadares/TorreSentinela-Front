import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  TorreSentinelaData,
  TorreSentinelaHistory,
  TorreSentinelaChuva
} from '../model/TorreSentinela';

@Injectable({
  providedIn: 'root'
})
export class TorreDetalhesHistoryService {
  listaTorresDetalhes: WritableSignal<TorreSentinelaHistory[]> =
    signal<TorreSentinelaHistory[]>([]);

  registrarLeituraTorre(torre: TorreSentinelaData) {
    const agora = Date.now();

    this.listaTorresDetalhes.update(listaAtual => {
      const index = listaAtual.findIndex(
        t => t.torreSentinela.torreIP === torre.torreIP
      );

      const tempoSemChuva = torre.tempoSemChuva ?? 0;

      if (index === -1) {
        const novoHistorico: TorreSentinelaHistory = {
          torreSentinela: torre,
          dataAdd: agora,
          historyChuvas: [],
          chovendoAgora: tempoSemChuva === 0,
          inicioChuvaAtual: tempoSemChuva === 0 ? agora : null
        };

        return [...listaAtual, novoHistorico];
      }

      const historicoExistente = listaAtual[index];
      const historicoAtualizado: TorreSentinelaHistory = {
        ...historicoExistente,
        torreSentinela: { ...torre }
      };

      if (tempoSemChuva === 0) {
        if (!historicoAtualizado.chovendoAgora) {
          historicoAtualizado.chovendoAgora = true;
          historicoAtualizado.inicioChuvaAtual = agora;
        }
      }

      if (tempoSemChuva > 0) {
        if (historicoAtualizado.chovendoAgora && historicoAtualizado.inicioChuvaAtual) {
          const duracaoSegundos = Math.floor(
            (agora - historicoAtualizado.inicioChuvaAtual) / 1000
          );

          const novoRegistroChuva: TorreSentinelaChuva = {
            data: historicoAtualizado.inicioChuvaAtual,
            duracao: duracaoSegundos
          };

          historicoAtualizado.historyChuvas = [
            ...historicoAtualizado.historyChuvas,
            novoRegistroChuva
          ];
        }

        historicoAtualizado.chovendoAgora = false;
        historicoAtualizado.inicioChuvaAtual = null;
      }

      const novaLista = [...listaAtual];
      novaLista[index] = historicoAtualizado;
      return novaLista;
    });
  }

  removerTorrePorIp(torreIP: string): void {
    this.listaTorresDetalhes.update(listaAtual =>
      listaAtual.filter(t => t.torreSentinela.torreIP !== torreIP)
    );
  }

  getHistoricoPorIp(torreIP: string): TorreSentinelaHistory | undefined {
    return this.listaTorresDetalhes().find(
      t => t.torreSentinela.torreIP === torreIP
    );
  }
}
