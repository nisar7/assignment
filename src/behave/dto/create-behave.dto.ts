import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBehaveDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;
}
