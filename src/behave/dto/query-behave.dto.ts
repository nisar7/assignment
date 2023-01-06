import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class QueryBehave {
  @IsString()
  duration: string;

  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
