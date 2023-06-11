import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './libs/components/form/form.component'
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { TaskStatusContainerComponent } from './libs/components/task-status-container/task-status-container.component';
import { TaskCardComponent } from './libs/components/task-card/task-card.component';
import { HeaderComponent } from './libs/components/header/header.component';
import { ModalComponent } from './libs/components/modal/modal.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './libs/components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskCalendarComponent } from './libs/components/task-calendar/task-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskStatusContainerComponent,
    TaskCardComponent,
    HeaderComponent,
    ModalComponent,
    FormComponent,
    SnackbarComponent,
    TaskCalendarComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatOptionModule,
    DragDropModule,
    CalendarModule.forRoot({
      provide: Date,
      useFactory: (): Date => new Date(),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent,CalendarModule]
})
export class AppModule { }
