import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interface/task';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task: Task | undefined;
  @Output() editTask = new EventEmitter<Task>();
  constructor(private taskService: TaskService, private modalService: ModalService) { }

  get showModalState(): boolean {
    return this.modalService.showModal;
  }
  set showModalState(value: boolean) {
    this.modalService.showModal = value;
  }
  EmitDataToParent(task: Task | undefined): void {
    this.editTask.emit(task);
  }
  deleteTask(task: Task | undefined): void {
    if (!task) {
      console.log('Task is undefined');
      return;
    }
    console.log('Task is not undefined');
    this.taskService.deleteTask(task);
  }
}

