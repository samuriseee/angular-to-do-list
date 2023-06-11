import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  _showModal: boolean = false;
  constructor() { }
  get showModal(): boolean {
    return this._showModal;
  }
  set showModal(value: boolean) {
    this._showModal = value;
  }
  changeModalState(): void {
    this._showModal = !this._showModal;
  }
}
