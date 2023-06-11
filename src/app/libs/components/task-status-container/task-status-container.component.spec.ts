import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusContainerComponent } from './task-status-container.component';

describe('TaskStatusContainerComponent', () => {
  let component: TaskStatusContainerComponent;
  let fixture: ComponentFixture<TaskStatusContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskStatusContainerComponent]
    });
    fixture = TestBed.createComponent(TaskStatusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
