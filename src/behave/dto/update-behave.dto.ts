import { PartialType } from '@nestjs/mapped-types';
import { CreateBehaveDto } from './create-behave.dto';

export class UpdateBehaveDto extends PartialType(CreateBehaveDto) {}
