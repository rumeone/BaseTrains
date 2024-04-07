import { Module } from '@nestjs/common';
import {DatabaseService} from './databese.service';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}