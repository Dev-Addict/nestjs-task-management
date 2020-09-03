import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../task-status.enum';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskValidationPipe implements PipeTransform {
  static readonly allowedStatuses: string[] = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  transform(updateTaskDto: UpdateTaskDto): UpdateTaskDto {
    const {title, description, status} = updateTaskDto;
    if (status && !TaskValidationPipe.allowedStatuses.includes(status.toUpperCase()))
      throw new BadRequestException(`\`${status}\` is an invalid status.`);

    return {title, description, status: TaskStatus[status.toUpperCase()]};
  }
}