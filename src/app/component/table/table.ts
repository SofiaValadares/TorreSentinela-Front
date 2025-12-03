import {Component} from '@angular/core';
import {ModalAddService} from '../../service/ModalAddService';
import {TorresSentinelaService} from '../../service/TorresSentinelaService';
import {MatIconModule} from '@angular/material/icon';
import {ModalDeleteService} from '../../service/ModalDeleteService';
import {ModalDetailsService} from '../../service/ModalDetailsService';
import {TorreSentinelaData} from '../../model/TorreSentinela';
import {formatarDataChuvaFromSegundos} from '../../utils/DataFormater';

@Component({
  selector: 'app-table',
  imports: [MatIconModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  constructor(
    public modalAdd: ModalAddService,
    public modalDelete: ModalDeleteService,
    public modalDetails: ModalDetailsService,
    public torresSentinela: TorresSentinelaService
  ) {}

  openModalAddTorre() {
    this.modalAdd.open();
  }

  openModalDetailsTorre(torre: TorreSentinelaData) {
    this.modalDetails.open(torre);
  }

  onClickRemoveTorre(torreIP: string) {
    this.modalDelete.open(torreIP)
  }

  formatarDataSimples(tempoSegundos: number): string {
    return formatarDataChuvaFromSegundos(tempoSegundos);
  }
}
