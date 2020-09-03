import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';

import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import { TaskStatus, Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task)
      throw new NotFoundException(`task with ID of \`${id}\` not found.`);

    return task;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.tasks;

    if (status)
      tasks = tasks.filter(task => task.status === status);

    if (search)
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    this.getTaskById(id);

    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
