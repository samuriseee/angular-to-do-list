import { TaskStatus } from './taskStatus';
export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
