import { ConfigurationCode } from '../../pgs-namespace/configuration.namespace';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../common/base.schema';

export type ConfigurationDocument = Configuration & Document;

@Schema({
    collection: 'pgs-configuration',
    timestamps: true
})
export class Configuration extends BaseSchema {

    @Prop({ required: true })
    code: ConfigurationCode;  

    @Prop({ required: true, type: String })
    value: any; 
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);