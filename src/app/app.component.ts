import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Task } from './libs/interface/task';
import { TaskStatus } from './libs/interface/taskStatus';
import { TaskService } from './libs/services/task.service';
import { ModalService } from './libs/services/modal.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
    this.taskService.tasksChange.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });

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
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }
  onDrop(event: CdkDragDrop<Task[]>): void {
    const droppedTask = event.item.data;
    const targetContainer = event.container.data;

    if (event.previousContainer === event.container) {
      if (Array.isArray(targetContainer)) {
        moveItemInArray(targetContainer, event.previousIndex, event.currentIndex);
      }
    } else {
      if (Array.isArray(event.previousContainer.data) && Array.isArray(targetContainer)) {
        transferArrayItem(
          event.previousContainer.data,
          targetContainer,
          event.previousIndex,
          event.currentIndex
        );
      }
      this.taskService.updateTaskStatus(droppedTask, targetContainer);
    }
  }

  viewCalendar(): void {
    this.changeCalendarModalState();
  }
  get showCalendarModal(): boolean {
    return this.modalService.showCalendarModal;
  }
  set showCalendarModal(value: boolean) {
    this.modalService.showCalendarModal = value;
  }
  changeCalendarModalState(): void {
    this.modalService.changeCalendarModalState();
  }
}
