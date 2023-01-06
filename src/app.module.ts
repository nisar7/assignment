import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BehaveModule } from './behave/behave.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    BehaveModule,
    MongooseModule.forRoot('mongodb://localhost:27017/assignment')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
