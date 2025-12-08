import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  TorreSentinelaData,
  TorreSentinelaHistory,
  TorreSentinelaDataInterval
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

      // ============================================================
      // CASO ESPECIAL: sem leitura válida (tempoSemChuva = null/erro)
      // Só atualiza dados, não registra chuva ou seca
      // ============================================================
      if (torre.tempoSemChuva == null) {
        if (index === -1) {
          const novoHistorico: TorreSentinelaHistory = {
            torreSentinela: torre,
            dataAdd: agora,
            historyChuvas: [],
            historySecas: [],
            chovendoAgora: false,
            inicioChuvaAtual: null,
            inicioSecaAtual: agora
          };
          return [...listaAtual, novoHistorico];
        }

        const historicoExistente = listaAtual[index];
        const historicoAtualizado: TorreSentinelaHistory = {
          ...historicoExistente,
          torreSentinela: { ...torre }
        };

        const novaLista = [...listaAtual];
        novaLista[index] = historicoAtualizado;
        return novaLista;
      }

      // ============================================================
      // Temos uma leitura válida
      // ============================================================
      const tempoSemChuva = torre.tempoSemChuva;

      if (index === -1) {
        const novoHistorico: TorreSentinelaHistory = {
          torreSentinela: torre,
          dataAdd: agora,
          historyChuvas: [],
          historySecas: [],
          chovendoAgora: tempoSemChuva === 0,
          inicioChuvaAtual: tempoSemChuva === 0 ? agora : null,
          inicioSecaAtual: tempoSemChuva > 0 ? agora : null
        };

        return [...listaAtual, novoHistorico];
      }

      const historicoExistente = listaAtual[index];
      const historicoAtualizado: TorreSentinelaHistory = {
        ...historicoExistente,
        torreSentinela: { ...torre }
      };

      // ============================================================
      // REGISTRO DE CHUVA
      // ============================================================
      if (tempoSemChuva === 0) {
        // Início de chuva
        if (!historicoAtualizado.chovendoAgora) {
          historicoAtualizado.chovendoAgora = true;
          historicoAtualizado.inicioChuvaAtual = agora;
        }

        // Se estava seco, finaliza a seca e registra
        if (
          historicoAtualizado.inicioSecaAtual &&
          historicoAtualizado.inicioSecaAtual < agora
        ) {
          const duracaoSeca = Math.floor(
            (agora - historicoAtualizado.inicioSecaAtual) / 1000
          );

          const novaSeca: TorreSentinelaDataInterval = {
            data: historicoAtualizado.inicioSecaAtual,
            duracao: duracaoSeca
          };

          historicoAtualizado.historySecas = [
            ...historicoAtualizado.historySecas,
            novaSeca
          ];

          historicoAtualizado.inicioSecaAtual = null;
        }
      }

      // ============================================================
      // REGISTRO DE SECA (tempoSemChuva > 0)
      // ============================================================
      if (tempoSemChuva > 0) {
        // Se estava chovendo, encerra chuva e registra
        if (
          historicoAtualizado.chovendoAgora &&
          historicoAtualizado.inicioChuvaAtual
        ) {
          const duracaoChuva = Math.floor(
            (agora - historicoAtualizado.inicioChuvaAtual) / 1000
          );

          const novaChuva: TorreSentinelaDataInterval = {
            data: historicoAtualizado.inicioChuvaAtual,
            duracao: duracaoChuva
          };

          historicoAtualizado.historyChuvas = [
            ...historicoAtualizado.historyChuvas,
            novaChuva
          ];
        }

        historicoAtualizado.chovendoAgora = false;
        historicoAtualizado.inicioChuvaAtual = null;

        // Se não estava seco, inicia seca
        if (!historicoAtualizado.inicioSecaAtual) {
          historicoAtualizado.inicioSecaAtual = agora;
        }
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
