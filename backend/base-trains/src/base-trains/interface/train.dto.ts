import {IsInt, IsString} from 'class-validator';
import {SeatDto} from './seat.dto';

export class TrainDto {

    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    departure: string;

    @IsString()
    destination: string;

    seats: {
        SV: SeatDto[];
        coupe: SeatDto[];
        platzkart: SeatDto[];
    };
}