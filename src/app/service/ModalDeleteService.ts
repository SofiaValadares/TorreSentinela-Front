import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDeleteService {
  isOpen: WritableSignal<boolean> = signal(false);
  torreIP: WritableSignal<string | null> = signal(null);

  open(torreIP: string) {
    this.isOpen.set(true);
    this.torreIP.set(torreIP);
  }

  close() {
    this.isOpen.set(false);
    this.torreIP.set(null);
  }
}
