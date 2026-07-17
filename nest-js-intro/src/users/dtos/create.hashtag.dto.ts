import { IsNotEmpty } from 'class-validator';

export class CreateHashtagDto {
  @IsNotEmpty()
  name!: string;
}
 