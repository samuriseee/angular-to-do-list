import { Injectable, EventEmitter } from '@angular/core';
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
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.Todo,
      createdAt: this.formatDate(new Date()),
    },
    {
      id: 2,
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.Doing,
      createdAt: this.formatDate(new Date()),
    },
  ]
  tasksChanged = new Subject<Task[]>();
  constructor() {
    this.tasksChanged.subscribe(updatedTasks => {
      this.tasks = updatedTasks;
    }
    );
  }
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }
  getTasks(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    this.tasks.push(task);
  }
  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index] = task;
  }
  deleteTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks = this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
  }
  updateTaskStatus(task: Task, status: any): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index].status = status;
  }
}
