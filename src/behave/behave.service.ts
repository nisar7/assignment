import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBehaveDto } from './dto/create-behave.dto';
import { UpdateBehaveDto } from './dto/update-behave.dto';
import { Behave, BehaveDocument } from './schemas/behave.schema';
import * as moment from 'moment';

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
      daily: moment(moment().toLocaleString()).toISOString(),
      week: moment().subtract(7, 'days').toISOString(),
      month: moment().subtract(30, 'days').toISOString(),
    };
    if (!queryParamReq[duration])
      throw new BadRequestException('Invalid params');
    console.log('queryParamReq[duration]', queryParamReq);

    return await this.behaveModel
      .find({
        createdAt: { $gte: queryParamReq[duration] },
      })
      .limit(pageSizeNum)
      .skip(pageSizeNum * pageNum);

    // if (duration === 'daily') {
    //   const currentDate = moment(moment().format('YYYYMMDD')).toISOString();

    //   return await this.behaveModel
    //     .find({
    //       createdAt: { $gte: currentDate },
    //     })
    //     .limit(pageSizeNum)
    //     .skip(pageSizeNum * pageNum);
    // }
    // if (duration === 'week') {
    //   const weekAgo = moment().subtract(7, 'days').toISOString();
    //   return await this.behaveModel
    //     .find({
    //       createdAt: { $gte: weekAgo },
    //     })
    //     .limit(pageSizeNum)
    //     .skip(pageSizeNum * pageNum);
    // }
    // if (duration === 'month') {
    //   const monthAgo = moment().subtract(30, 'days').toISOString();

    //   return await this.behaveModel
    //     .find({
    //       createdAt: { $gte: monthAgo },
    //     })
    //     .limit(pageSizeNum)
    //     .skip(pageSizeNum * pageNum);
    // }
  }

  async findOne(id: string) {
    try {
      return `This action returns a #${id} behave`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateBehaveDto: UpdateBehaveDto) {
    try {
      return `This action updates a #${id} behave`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return `This action removes a #${id} behave`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
