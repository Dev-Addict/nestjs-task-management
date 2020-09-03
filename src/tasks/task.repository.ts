import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;

    const task = await this.findOne(id);

    if (!task)
      throw new NotFoundException(`Can not find a task with id of \`${id}\`.`);

    if (title)
      task.title = title;
    if (description)
      task.description = description;
    if (status)
      task.status = status;

    await task.save();

    return task;
  }

  async getTasks(filterDto: TasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status)
      query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });

    return query.getMany();
  }
}