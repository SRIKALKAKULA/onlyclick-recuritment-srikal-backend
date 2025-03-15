import { Task } from "./models";

// Task Interface
export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
}

export default Task;
