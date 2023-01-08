/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateBehaveDto } from './dto/create-behave.dto';
import { UpdateBehaveDto } from './dto/update-behave.dto';
import { Behave, BehaveDocument } from './schemas/behave.schema';
import * as moment from 'moment';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class BehaveService {
  constructor(
    @InjectModel(Behave.name) private behaveModel: Model<BehaveDocument>,
  ) {}
  async create(createBehaveDto: CreateBehaveDto) {
    try {
      return await this.behaveModel.create(createBehaveDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll({ page, pageSize, duration }) {
    const pageNum = page ? parseInt(page) : 0;
    const pageSizeNum = pageSize ? parseInt(pageSize) : 0;
    const queryParamReq = {
      daily: moment(moment().toLocaleString()).toDate().setHours(0, 0, 0, 0),
      week: moment().subtract(7, 'days').toDate().setHours(0, 0, 0, 0),
      month: moment().subtract(30, 'days').toDate().setHours(0, 0, 0, 0),
    };
    if (!queryParamReq[duration])
      throw new BadRequestException('Valid params are: daily, week, month');

    try {
      return await this.behaveModel
        .find({
          createdAt: { $gte: queryParamReq[duration] },
        })
        .limit(pageSizeNum)
        .skip(pageSizeNum * pageNum);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(_id: string) {
    try {
      return await this.behaveModel.findOne({ _id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(_id: string, updateBehaveDto: UpdateBehaveDto) {
    try {
      const updateRecord = await this.behaveModel.updateOne(
        { _id },
        updateBehaveDto,
      );
      if (updateRecord) {
        return 'Record is updated';
      }
      return 'Some thing went wrong';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(_id: string) {
    try {
      return await this.behaveModel.deleteOne({ _id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  imageBuffer(name) {
    const filePath = `/images/${name}`;
    return readFileSync(join(process.cwd(), filePath));
  }
}
