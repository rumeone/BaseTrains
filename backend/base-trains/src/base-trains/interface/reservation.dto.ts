import { IsInt, IsString } from 'class-validator';

export class ReservationDto {
    @IsInt()
    trainId: number;

    @IsString()
    category: string;

    @IsInt()
    seatId: number;
}