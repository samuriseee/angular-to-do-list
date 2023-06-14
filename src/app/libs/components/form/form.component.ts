import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, transition } from '@angular/animations';
import { Task } from '../../interface/task';
import { TaskStatus } from '../../interface/taskStatus';
import { TaskService } from '../../services/task.service';
import { ModalService } from '../../services/modal.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [SnackbarService],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() task: Task | undefined = undefined;
  snackBarMessage: string = '';
  showModal = this.modalService.showModal;
  taskStatuses = Object.values(TaskStatus);;
  myForm: FormGroup = undefined as any;
  isUpdate = false;
  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private modalService: ModalService, private snackbar: SnackbarService) {
    this.myForm = this.formBuilder.group({
      title: [''],
      description: [''],
      status: [TaskStatus.Todo],
    });
  }
  ngOnInit(): void {
    this.updateForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.updateForm();
    }
  }
  updateForm(): void {
    if (this.task) {
      this.myForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      });
    }
  }
  changeModalState(): void {
    this.modalService.changeModalState();
  }
  showSnackbar(message: string,action: string,backgroundColor:string): void {
    this.snackbar.showSnackBar(message,action,backgroundColor);
  }
  onSubmit(): void {
    const { title, description, status } = this.myForm.value;
    if (!title || !description) return;

    if (this.task && this.task.title != '') {
      const updatedTask: Task = {
        ...this.task,
        title,
        description,
        status
      };
      this.taskService.updateTask(updatedTask);
      this.showSnackbar('Task updated successfully','Close','#3BC057');
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        status,
        createdAt: this.taskService.formatDate(new Date())
      };
      this.taskService.addTask(newTask);
      this.showSnackbar('Task added successfully','Close','#3BC057');
    }
    this.changeModalState();
    this.myForm.reset();
  }


}
