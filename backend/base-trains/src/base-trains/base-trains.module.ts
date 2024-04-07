import { Module } from '@nestjs/common';
import {DatabaseModule} from '../database/databse.module';
import {BaseTrainsController} from './base-trains.controller';
import {BaseTrainsService} from './base-trains.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BaseTrainsController],
    providers: [BaseTrainsService],
})
export class BaseTrainsModule {}
