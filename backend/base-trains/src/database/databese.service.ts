import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import {TrainDto} from '../base-trains/interface/train.dto';
import * as path from 'path';

@Injectable()
export class DatabaseService {
    private dbPath = path.join(process.cwd(), 'src', 'db.json');


    readData(): TrainDto[] {
        const rawData = fs.readFileSync(this.dbPath, 'utf-8');
        const data = JSON.parse(rawData);
        return data.trains || [];
    }

    writeData(entity: string, data: any[]): void {
        const jsonData = JSON.stringify({ [entity]: data }, null, 2);
        fs.writeFileSync(this.dbPath, jsonData);
    }

    findAll(entity: string): any[] {
        const data = this.readData();
        return data[entity] || [];
    }

    findOne(id: number): TrainDto | undefined {
        const trains = this.readData();
        id = parseInt(String(id), 10)
        return trains.find((train) => train.id === id);
    }
}
