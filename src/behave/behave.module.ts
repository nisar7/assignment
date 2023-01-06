import { Module } from '@nestjs/common';
import { BehaveService } from './behave.service';
import { BehaveController } from './behave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Behave, BehaveSchema } from './schemas/behave.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Behave.name, schema: BehaveSchema }]),
  ],
  controllers: [BehaveController],
  providers: [BehaveService],
})
export class BehaveModule {}
