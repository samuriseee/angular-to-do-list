import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interface/task';
import { ModalService } from '../../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task: Task | undefined;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  constructor(private taskS: TaskService,private modalService: ModalService, private dialog: MatDialog) { }

  get showModalState(): boolean {
    return this.modalService.showModal;
  }
  set showModalState(value: boolean) {
    this.modalService.showModal = value;
  }
  EditTask(task: Task | undefined): void {
    this.editTask.emit(task);
  }
  DeleteTask(task: Task | undefined): void {
    this.taskS.deleteTask
  }
  openConfirmDialog(task: Task | undefined, action: string): void {
    const message = action === 'delete' ? `Are you sure you want to delete this task '${task?.title}'?` : `Are you sure you want to edit this task '${task?.title}'?`;
    const confirmText = action === 'delete' ? 'Delete' : 'Edit';
    const cancelText = 'Cancel';
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: { message, confirmText, cancelText },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'delete') {
          this.DeleteTask(task);
        } else {
          this.EditTask(task);
        }
      }
    });

  }
}

