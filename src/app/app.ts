import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './component/header/header';
import { Table } from './component/table/table';
import { ModalAdd } from './component/modal-add/modal-add';
import {ModalAddService} from './service/ModalAddService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Table,
    ModalAdd,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public modalAdd: ModalAddService) {}
}
