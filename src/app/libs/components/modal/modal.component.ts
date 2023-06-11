import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange = new EventEmitter();
  constructor(private modalService: ModalService) { }
  get showModalState(): boolean {
    return this.modalService.showModal;
  }
  set showModalState(value: boolean) {
    this.modalService.showModal = value;
  }
  changeModalState(): void {
    this.modalService.changeModalState();
  }

}
