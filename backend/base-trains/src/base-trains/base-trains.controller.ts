import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ReservationDto } from './interface/reservation.dto';
import { TrainDto } from './interface/train.dto';
import { BaseTrainsService } from './base-trains.service';
import {SeatDto} from './interface/seat.dto';

@Controller('trains')
export class BaseTrainsController {
    constructor(private readonly baseTrainsService: BaseTrainsService) {}

    @Get()
    getTrains(): TrainDto[] {
        return this.baseTrainsService.getTrains();
    }

    @Get('train/:name')
    getTrainByName(@Param('name') name: string): TrainDto {
        return this.baseTrainsService.getTrainByName(name);
    }

    @Get(':id')
    getTrainById(@Param('id') trainId: number): TrainDto {
        return this.baseTrainsService.getTrainById(trainId);
    }
    @Post('get-free-seats')
    getFreeSeats(@Body('trainId') trainId: number, @Body('category') category: string): SeatDto[] {
        return this.baseTrainsService.getFreeSeats(trainId, category);
    }


    @Post()
    createTrain(@Body('name') name: string, @Body('departure') departure: string,
                @Body('destination') destination: string): TrainDto {
        return this.baseTrainsService.createTrain(name, departure, destination);
    }

    @Put('reserve-seat')
    reserveSeat(@Body() reservationDto: ReservationDto): TrainDto {
        return this.baseTrainsService.reserveSeat(reservationDto);
    }
}
