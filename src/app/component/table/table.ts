import {Component} from '@angular/core';
import {ModalAddService} from '../../service/ModalAddService';
import {TorresSentinelaService} from '../../service/TorresSentinelaService';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  constructor(public modalAdd: ModalAddService, public torresSentinela: TorresSentinelaService) {}

  openModalAddTorre() {
    this.modalAdd.open();
  }
}
