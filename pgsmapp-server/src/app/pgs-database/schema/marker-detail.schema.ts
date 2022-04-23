import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../common/base.schema';

export type MarkerDetailDocument = MarkerDetail & Document;

@Schema({
    collection: 'pgs-marker-detail',
    timestamps: true
})
export class MarkerDetail extends BaseSchema {

    @Prop({ required: true })
    idMarker: string;

    @Prop({ required: true })
    idLanguage: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    subtitle: string;

    @Prop({ required: true })
    description: string; 
}

export const MarkerDetailSchema = SchemaFactory.createForClass(MarkerDetail);