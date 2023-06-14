import { Component, Renderer2, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../interface/task';
import { TaskStatus } from '../../interface/taskStatus';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss']
})
export class TaskCalendarComponent implements OnInit {
  tasks: Task[] = [];
  groupTasks: { status: TaskStatus; color: string; }[] = [
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
  Today = [{ date: this.dateToString(new Date()), text: "Today" }]

  constructor(private taskServices: TaskService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.displayMonth();
    });
  }

  dateClass = (d: Date) => {
    if (d.getDate() == 1)
      this.displayMonth()
    const dateSearch = this.dateToString(d);
    if (this.Today.find(f => f.date == dateSearch)) {
      return this.Today.find(f => f.date == dateSearch)
        ? "todays_class"
        : "normal";
    } else {
      return this.tasks.find(f => f.createdAt == dateSearch)
        ? "example-custom-date-class"
        : "normal";
    }

  };

  displayMonth() {
    setTimeout(() => {
      let elements = document.querySelectorAll(".endDate");
      let x = document.querySelectorAll(".mat-calendar-body-cell") as NodeListOf<HTMLElement>;
      x.forEach((y: HTMLElement) => {
        const ariaLabel = y.getAttribute("aria-label");
        const dateSearch = ariaLabel ? this.dateToString(new Date(ariaLabel)) : '';
        const datalist = this.tasks.filter(f => f.createdAt === dateSearch);

        const data_today = this.Today.find(f => f.date === dateSearch);
        datalist.forEach((data, index) => {
          y.setAttribute("aria-label", data.title);
          y.classList.add("example-custom-date-class");

          const taskElement = this.renderer.createElement("span");
          taskElement.textContent = data.title;
          taskElement.classList.add("task-card");
          if (index >= 1) {
            taskElement.classList.add("margin-top");
          }
          taskElement.style.backgroundColor = this.groupTasks.find(f => f.status === data.status)?.color || '';

          y.appendChild(taskElement);
        });

        if (data_today) {
          y.setAttribute("aria-label", data_today.text);
          y.classList.add("todays_class");
          const taskElement = this.renderer.createElement("span");
          taskElement.textContent = data_today.text;
          y.appendChild(taskElement);
        }
      });
    });
  }


  streamOpened() {
    setTimeout(() => {
      let buttons = document.querySelectorAll("mat-calendar .mat-icon-button");

      buttons.forEach(btn =>
        this.renderer.listen(btn, "click", () => {
          setTimeout(() => {
            this.displayMonth();
          });
        })
      );
      this.displayMonth();
    });
  }

  // dateToString(date: any) {
  //   return (
  //     date.getFullYear() +
  //     "-" +
  //     ("0" + (date.getMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("0" + date.getDate()).slice(-2)
  //   );
  // }
  dateToString(date: any) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}

