import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task)
      throw new NotFoundException(`Can not find a task with id of \`${id}\`.`);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (!result.affected)
      throw new NotFoundException(`Can not find a task with id of \`${id}\`.`);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.updateTask(id, updateTaskDto);
  }

  getTasks(filterDto: TasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}
