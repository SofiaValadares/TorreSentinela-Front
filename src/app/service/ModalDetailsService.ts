import {Injectable, signal, WritableSignal} from '@angular/core';
import {TorreSentinelaData} from '../model/TorreSentinela';

@Injectable({
  providedIn: 'root'
})
export class ModalDetailsService {
  isOpen: WritableSignal<boolean> = signal(false);
  torre: WritableSignal<TorreSentinelaData | null> = signal(null);

  open(torre: TorreSentinelaData) {
    this.isOpen.set(true);
    this.torre.set(torre);
  }

  close() {
    this.isOpen.set(false);
    this.torre.set(null);
  }
}
