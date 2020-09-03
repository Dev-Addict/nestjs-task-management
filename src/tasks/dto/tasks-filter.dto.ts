import { TaskStatus } from '../task-status.enum';
import { IsIn, IsOptional } from 'class-validator';

export class TasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  search: string;
}