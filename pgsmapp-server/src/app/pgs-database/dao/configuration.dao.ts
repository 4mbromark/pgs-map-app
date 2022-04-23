import { ConfigurationCode } from '../../pgs-namespace/configuration.namespace';
import { Configuration } from '../schema/configuration.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ConfigurationDocument } from "../schema/configuration.schema";

@Injectable()
export class ConfigurationDao {

    constructor(
        @InjectModel(Configuration.name) private configurationModel: Model<ConfigurationDocument>
    ) {}

    public async getByCode(code: ConfigurationCode): Promise<Configuration> { 
        const configuration = await this.configurationModel.findOne({
            code: code
        });
        return configuration;
    }

    public async update(code: ConfigurationCode, value: any): Promise<void> {
        await this.configurationModel.updateOne({
            code: code
        }, {
            value: value
        });
    }
}