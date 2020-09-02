import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../task.model';

export default class TaskStatusValidationPipe implements PipeTransform {
  static readonly allowedStatuses: string[] = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  transform(value: string): string {
    if (!TaskStatusValidationPipe.allowedStatuses.includes(value.toUpperCase()))
      throw new BadRequestException(`${value} is an invalid status.`);

    return value.toUpperCase();
  }
}