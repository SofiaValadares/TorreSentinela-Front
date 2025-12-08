import {Component} from '@angular/core';
import {ModalDetailsService} from '../../service/ModalDetailsService';
import {MatIconModule} from '@angular/material/icon';
import {TorreDetalhesHistoryService} from '../../service/TorreDetalhesHistoryService';
import {TorreSentinelaDataInterval, TorreSentinelaHistory} from '../../model/TorreSentinela';
import {formatarDataFromMs, formatarDataHoraFromMs, formatarHoraFromS} from '../../utils/DataFormater';

export enum tabelas {
  CHUVA,
  SECA
}

@Component({
  selector: 'app-modal-details',
  imports: [MatIconModule],
  templateUrl: './modal-details.html',
  styleUrl: './modal-details.css',
})
export class ModalDetails {
  detalhesTorre?: TorreSentinelaHistory;
  tabelaAtiva: tabelas = tabelas.CHUVA;

  constructor(
    public modalDetails: ModalDetailsService,
    public detalhesTorreService: TorreDetalhesHistoryService
  ) {
    const torreIP = this.modalDetails.torre()?.torreIP;

    if (!torreIP) {
      this.modalDetails.close();
      return;
    }

    const historico = this.detalhesTorreService.getHistoricoPorIp(torreIP);

    if (!historico) {
      this.modalDetails.close();
      return;
    }

    this.detalhesTorre = historico;
  }

  onClose() {
    this.modalDetails.close();
  }

  onClickChuvas() {
    this.tabelaAtiva = tabelas.CHUVA;
  }

  onClickSecas() {
    this.tabelaAtiva = tabelas.SECA;
  }

  isTabelaAtiva(tabelaAtiva: tabelas): boolean {
    return this.tabelaAtiva === tabelaAtiva;
  }

  getDataAddString(): string {
    if (!this.detalhesTorre) {
      return '';
    }

    return formatarDataHoraFromMs(this.detalhesTorre.dataAdd);
  }

  getChuvas(): TorreSentinelaDataInterval[] {
    return this.detalhesTorre?.historyChuvas ?? [];
  }

  getChuvasRecentes() {
    if (!this.detalhesTorre) return [];
    return [...this.detalhesTorre.historyChuvas]
      .sort((a, b) => b.data - a.data)
      .slice(0, 10);
  }

  getSecas(): TorreSentinelaDataInterval[] {
    return this.detalhesTorre?.historySecas ?? [];
  }

  getSecasRecentes() {
    if (!this.detalhesTorre) return [];
    return [...this.detalhesTorre.historySecas]
      .sort((a, b) => b.data - a.data)
      .slice(0, 10);
  }

  getMaxDuracao(): number {
    if (this.tabelaAtiva == tabelas.CHUVA) {
      const chuvas = this.getChuvasRecentes();
      if (!chuvas.length) return 0;
      return chuvas.reduce((max, inc) => inc.duracao > max ? inc.duracao : max, 0);
    }
    const secas = this.getSecasRecentes();
    if (!secas.length) return 0;
    return secas.reduce((max, inc) => inc.duracao > max ? inc.duracao : max, 0);
  }

  getAlturaBarra(duracao: number): number {
    const max = this.getMaxDuracao();
    if (max === 0) return 0;
    return (duracao / max) * 100;
  }

  formatarData(timestamp: number): string {
    return formatarDataFromMs(timestamp);
  }

  formatarTempo(tempo: number): string {
    return formatarHoraFromS(tempo);
  }

  protected readonly tabelas = tabelas;
}
