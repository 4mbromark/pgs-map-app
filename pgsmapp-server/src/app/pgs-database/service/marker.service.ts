import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { MarkerDao } from '../dao/marker.dao';
import { Marker } from '../schema/marker.schema';

@Injectable()
export class MarkerService {

    constructor(
        private readonly markerDao: MarkerDao
    ) {}

    public async getAll(): Promise<Marker[]> {
        return await this.markerDao.getAll();
    }

    public async getById(_id: ObjectId | string): Promise<Marker> {
        return await this.markerDao.getById(_id);
    }
}