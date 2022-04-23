import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from 'mongoose';
import { Marker, MarkerDocument } from "../schema/marker.schema";

@Injectable()
export class MarkerDao {

    constructor(
        @InjectModel(Marker.name) private markerModel: Model<MarkerDocument>
    ) {}

    public async getAll(): Promise<Marker[]> { 
        const marker = await this.markerModel.find();
        return marker;
    }

    public async getById(_id: ObjectId | string): Promise<Marker> { 
        const marker = await this.markerModel.findById(_id);
        return marker;
    }
}