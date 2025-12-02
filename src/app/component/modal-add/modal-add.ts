import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {ModalAddService} from '../../service/ModalAddService';
import {TorresSentinelaService} from '../../service/TorresSentinelaService';

@Component({
  selector: 'app-modal-add',
  standalone: true, // se for standalone
  templateUrl: './modal-add.html',
  styleUrls: ['./modal-add.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ModalAdd {
  constructor(public modalAdd: ModalAddService, public listaTorres: TorresSentinelaService) {
  }

  addDisable(): boolean {
    return !this.modalAdd.isSaveAble();
  }

  closeModalAddTorre() {
    this.modalAdd.clear();
    this.modalAdd.close();
  }

  onClickAddTorre() {
    const torreIP = this.modalAdd.torreIP();
    const latitude = this.modalAdd.latitude();
    const longitude = this.modalAdd.longitude();

    if (!this.modalAdd.isSaveAble()) {
      return;
    }

    this.listaTorres.addTorre({
      latitude: latitude!, longitude: longitude!, torreIP: torreIP!
    })

    this.modalAdd.clear();
    this.modalAdd.close();
  }
}
