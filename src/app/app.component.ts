import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Task } from './libs/interface/task';
import { TaskStatus } from './libs/interface/taskStatus';
import { TaskService } from './libs/services/task.service';
import { ModalService } from './libs/services/modal.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TaskService]
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  groupTasks: any = [
    {
      status: TaskStatus.Todo,
      color: '#00A6DA',
    },
    {
      status: TaskStatus.Doing,
      color: 'rgba(204, 172, 3, 0.56)',
    },
    {
      status: TaskStatus.Finished,
      color: '#3BC057',
    },
  ];
  taskStatuses = TaskStatus;
  taskData: Task | undefined;
  constructor(private taskService: TaskService, private modalService: ModalService) {
  }
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }
  get showModalState(): boolean {
    return this.modalService.showModal;
  }
  set showModalState(value: boolean) {
    this.modalService.showModal = value;
  }
  changeModalState(): void {
    this.modalService.changeModalState();
  }
  getTaskByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
  addNewTask(): void {
    this.changeModalState();
    this.taskData = {
      id: 0,
      title: '',
      description: '',
      status: TaskStatus.Todo,
      createdAt: '',
    };
  }
  editTask(task: Task): void {
    this.taskData = task;
    this.changeModalState();
  }
  onDrop(event: CdkDragDrop<Task[]>): void {
    const dropedTask = event.item.data;
    const targetContainer = event.container.data;
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskService.updateTaskStatus(dropedTask, targetContainer);
  }
}
