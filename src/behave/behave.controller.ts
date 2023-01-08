/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Res,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BehaveService } from './behave.service';
import { CreateBehaveDto } from './dto/create-behave.dto';
import { UpdateBehaveDto } from './dto/update-behave.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { Helper } from './../shared/helper';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBehaveDto: UpdateBehaveDto) {
    return this.behaveService.update(id, updateBehaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.behaveService.remove(id);
  }

  @Put('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return `${process.env.BASE_URL}/behave/downloadFile/${file.filename}`;
  }

  @Get('downloadFile/:name')
  downloadFile(@Res() response: Response, @Param('name') name: string) {
    const file = this.behaveService.imageBuffer(name);
    response.send(file);
  }
}
