import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskStatus } from '../../interface/taskStatus';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-status-container',
  templateUrl: './task-status-container.component.html',
  styleUrls: ['./task-status-container.component.scss'],
  providers: [TaskService],
})
export class TaskStatusContainerComponent {
  @Input() tasks: Task[] = [];
  @Input() taskStatus: {
    status: TaskStatus,
    color: string,
  } | undefined;
  taskStatuses = TaskStatus;
  @Output() editTask = new EventEmitter<Task>();
  @Output() taskDropped = new EventEmitter<TaskStatus>();
  constructor(private taskService: TaskService) { }

  getDataFromCardThenEmitToParent(task: Task): void {
    this.editTask.emit(task);
  }
  getTaskStatusLength(): number {
    return this.tasks.length;
  }

}
