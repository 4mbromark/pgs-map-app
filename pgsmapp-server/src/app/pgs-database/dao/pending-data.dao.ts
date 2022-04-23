import { PendingDataCode } from './../../pgs-namespace/pending-data.namespace';
import { PendingData, PendingDataDocument } from './../schema/pending-data.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class PendingDataDao {

    constructor(
        @InjectModel(PendingData.name) private pendingDataModel: Model<PendingDataDocument>
    ) {}

    public async getByCode(code: PendingDataCode): Promise<PendingData> { 
        const pendingData = await this.pendingDataModel.findOne({
            code: code
        });
        return pendingData;
    }

    public async insertOrUpdate(pendingData: PendingData): Promise<void> {
        await this.pendingDataModel.updateOne({
            code: pendingData.code
        }, pendingData, {
            upsert: true
        })
    }
}