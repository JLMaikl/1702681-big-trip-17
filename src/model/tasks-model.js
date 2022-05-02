import { generatePoint } from '../mock/task';

export default class TaskModel {
  tasks = Array.from({length: 3}, generatePoint);

  getTasks = () => this.tasks;
}
