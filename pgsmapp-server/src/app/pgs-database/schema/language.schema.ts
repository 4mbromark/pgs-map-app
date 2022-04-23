import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { BaseSchema } from '../common/base.schema';

export type LanguageDocument = Language & Document;

@Schema({
    collection: 'pgs-language',
    timestamps: true
})
export class Language extends BaseSchema {

    @Prop({ required: true })
    code: string;  
}

export const LanguageSchema = SchemaFactory.createForClass(Language);