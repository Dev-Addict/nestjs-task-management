import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskValidationPipe } from './pipes/task-validation.pipe';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService
  ) {
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskValidationPipe) updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: TasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
}
