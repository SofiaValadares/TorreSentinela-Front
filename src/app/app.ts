import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './component/header/header';
import { Table } from './component/table/table';
import { ModalAdd } from './component/modal-add/modal-add';
import { ModalAddService } from './service/ModalAddService';
import { ModalDeleteService } from './service/ModalDeleteService';
import {ModalDelete} from './component/modal-delete/modal-delete';
import { ModalDetailsService } from './service/ModalDetailsService';
import {ModalDetails} from './component/modal-details/modal-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Table,
    ModalAdd,
    ModalDelete,
    ModalDetails,

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    public modalAdd: ModalAddService,
    public modalDelete: ModalDeleteService,
    public modalDetails: ModalDetailsService
  ) { }
}
