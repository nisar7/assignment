/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BehaveService } from './behave.service';
import { CreateBehaveDto } from './dto/create-behave.dto';
import { UpdateBehaveDto } from './dto/update-behave.dto';

@Controller('behave')
export class BehaveController {
  constructor(private readonly behaveService: BehaveService) {}

  @Post()
  create(@Body() createBehaveDto: CreateBehaveDto) {
    return this.behaveService.create(createBehaveDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.behaveService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.behaveService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBehaveDto: UpdateBehaveDto) {
    return this.behaveService.update(id, updateBehaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.behaveService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'upload/' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('process', process.env.BASE_URL);
  }
}
