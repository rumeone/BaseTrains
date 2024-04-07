import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { ReservationDto } from './interface/reservation.dto';
import { SeatDto } from './interface/seat.dto';
import { TrainDto } from './interface/train.dto';
import { DatabaseService } from '../database/databese.service';

@Injectable()
export class BaseTrainsService {
    private trains: TrainDto[] = [];
    constructor(private readonly databaseService: DatabaseService) {
        this.trains = this.databaseService.readData();
    }

    getTrainById(trainId: number): TrainDto {
        try {
            const train = this.databaseService.findOne(trainId);
            if (!train) {
                throw new HttpException(`Train with ID ${trainId} not found`, HttpStatus.NOT_FOUND);
            }
            return train;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getTrains(): TrainDto[] {
        return this.trains;
    }

    getFreeSeats(trainId: number, category: string): SeatDto[] {
        const train = this.getTrainById(trainId);
        if (!train) {
            throw new Error(`Train with ID ${trainId} not found`);
        }
        return train.seats[category].filter((seat) => seat.isFree);
    }

    getTrainByName(name: string): TrainDto {
        console.log(this.trains);
        try {
            const train = this.trains.find((train) => train.name === name);
            if (!train) {
                throw new HttpException(`Train with name ${name} not found`, HttpStatus.NOT_FOUND);
            }
            return train;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    reserveSeat(reservationDto: ReservationDto): TrainDto {
        try {
            const { trainId, category, seatId } = reservationDto;
            const trains = this.databaseService.readData();

            const trainIndex = trains.findIndex((train) => train.id === trainId);
            if (trainIndex === -1) {
                throw new HttpException(`Train with ID ${trainId} not found`, HttpStatus.NOT_FOUND);
            }

            const train = trains[trainIndex];
            const seat = train.seats[category].find((seat) => seat.id === seatId);
            if (!seat) {
                throw new HttpException(`Seat with ID ${seatId} not found in category ${category}`, HttpStatus.NOT_FOUND);
            }

            if (!seat.isFree) {
                throw new HttpException(`Seat with ID ${seatId} in category ${category} is already reserved`, HttpStatus.CONFLICT);
            }

            seat.isFree = false;
            trains[trainIndex] = train;
            this.databaseService.writeData('trains', trains);
            return train;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    createTrain(name: string, departure: string, destination: string): TrainDto {
        try {
            const trains = this.trains;
            const train: TrainDto = {
                id: trains.length + 1,
                name,
                departure,
                destination,
                seats: {
                    SV: this.createSeats(2, 1000),
                    coupe: this.createSeats(3, 500),
                    platzkart: this.createSeats(4, 300),
                },
            };
            this.trains.push(train);
            this.databaseService.writeData('trains', this.trains);
            return train;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private createSeats(count: number, costs: number): SeatDto[] {
        const seats: SeatDto[] = [];
        for (let i = 0; i < count; i++) {
            seats.push({ id: i + 1, isFree: true, costs: costs });
        }
        return seats;
    }
}