import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from './database/databse.module';
import {BaseTrainsModule} from './base-trains/base-trains.module';

@Module({
  imports: [DatabaseModule, BaseTrainsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
