import { Coordinate } from '../../pgs-namespace/map.namespace';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../common/base.schema';

export type MarkerDocument = Marker & Document;

@Schema({
    collection: 'pgs-marker',
    timestamps: true
})
export class Marker extends BaseSchema {

    @Prop({ required: true })
    type: string;  

    @Prop({ required: true })
    coordinate: Coordinate;  
}

export const MarkerSchema = SchemaFactory.createForClass(Marker);