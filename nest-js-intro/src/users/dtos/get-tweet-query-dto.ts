 import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationQueryDto } from '../../common/pagination-query-dto';

export class GetTweetBaseDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}

export class GetTweetQueryDto extends IntersectionType(
  GetTweetBaseDto,
  PaginationQueryDto,
) {}