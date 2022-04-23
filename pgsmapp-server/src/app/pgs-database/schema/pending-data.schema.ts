import { PendingDataCode } from './../../pgs-namespace/pending-data.namespace';
import { Coordinate } from '../../pgs-namespace/map.namespace';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../common/base.schema';

export type PendingDataDocument = PendingData & Document;

@Schema({
    collection: 'pgs-pending-data',
    timestamps: true
})
export class PendingData extends BaseSchema {

    @Prop({ required: true })
    code: PendingDataCode;  

    @Prop({ required: true, type: String })
    value: any; 
}

export const PendingDataSchema = SchemaFactory.createForClass(PendingData);