import { Component } from '@angular/core';
import {TorresSentinelaService} from '../../service/TorresSentinelaService';
import {ModalDeleteService} from '../../service/ModalDeleteService';

@Component({
  selector: 'app-modal-delete',
    imports: [],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.css',
})
export class ModalDelete {
  constructor(public modalDelete: ModalDeleteService, public listaTorres: TorresSentinelaService) {
  }

  onCloseModalDelete (){
    this.modalDelete.close();
  }

  onConfirmDelete () {
    if (this.modalDelete.torreIP() != null) {
      this.listaTorres.removeTorre(this.modalDelete.torreIP()!)
      this.modalDelete.close();
    }
  }
}
