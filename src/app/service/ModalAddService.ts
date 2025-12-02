import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {
  isOpen: WritableSignal<boolean> = signal(false);

  torreIP: WritableSignal<string | null> = signal(null);
  latitude: WritableSignal<number | null> = signal(null);
  longitude: WritableSignal<number | null> = signal(null);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  clear() {
    this.torreIP.set(null);
    this.latitude.set(null);
    this.longitude.set(null);
  }

  isSaveAble(): boolean {
    const ip = this.torreIP();
    const lat = this.latitude();
    const lng = this.longitude();

    const idValido = ip !== null && ip.trim().length > 0;

    const latValida = lat !== null && !Number.isNaN(lat);
    const lngValida = lng !== null && !Number.isNaN(lng);

    return idValido && latValida && lngValida;
  }

}
