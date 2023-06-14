import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../interface/task';
import { TaskStatus } from '../interface/taskStatus';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Make Coffee',
      description: 'I need to make coffee today',
      status: TaskStatus.Todo,
      createdAt: this.formatDate(new Date('2023-06-08')),
    },
    {
      id: 4,
      title: 'Code some stuff',
      description: 'I need to code some stuff today',
      status: TaskStatus.Todo,
      createdAt: this.formatDate(new Date('2023-06-10')),
    },
    {
      id: 2,
      title: 'Go for a walk',
      description: 'Go for a walk at 29/3 park',
      status: TaskStatus.Doing,
      createdAt: this.formatDate(new Date('2023-06-09')),
    },
    {
      id: 3,
      title: 'Fix some bugs at the app',
      description: 'App-modal and app-calendar-modal are not working properly',
      status: TaskStatus.Finished,
      createdAt: this.formatDate(new Date('2023-06-12')),
    }
  ]
  @Output() tasksChange = new EventEmitter()
  tasksChanged = new Subject<Task[]>();
  constructor() {

  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
  addTask(task: Task): void {
    this.tasks.push(task)
  }
  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index] = task;
  }
  deleteTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks = this.tasks.filter((t, i) => i !== index);
    this.tasksChange.emit(this.tasks);
  }
  updateTaskStatus(task: Task, status: any): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index].status = status;
  }
}
