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

  _showCalendarModal: boolean = false;
  get showCalendarModal(): boolean {
    return this._showCalendarModal;
  }
  set showCalendarModal(value: boolean) {
    this._showCalendarModal = value;
  }
  changeCalendarModalState(): void {
    this._showCalendarModal = !this._showCalendarModal;
  }

  turnOffModal(): void {
    this._showModal = false;
    this._showCalendarModal = false;
  }
}
