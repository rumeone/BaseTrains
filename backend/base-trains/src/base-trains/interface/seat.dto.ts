import {IsBoolean, IsInt} from 'class-validator';

export class SeatDto {
    @IsInt()
    id: number;

    @IsInt()
    costs: number;

    @IsBoolean()
    isFree: boolean;
}