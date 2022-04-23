import { PendingDataCode } from './../../pgs-namespace/pending-data.namespace';
import { PendingDataDao } from './../dao/pending-data.dao';
import { ConfigurationCode } from '../../pgs-namespace/configuration.namespace';
import { ConfigurationDao } from '../dao/configuration.dao';
import { Injectable } from '@nestjs/common';
import { Configuration } from '../schema/configuration.schema';
import { PendingData } from '../schema/pending-data.schema';

@Injectable()
export class PendingDataService {

    constructor(
        private readonly pendingDataDao: PendingDataDao
    ) {}

    public async getByCode(code: PendingDataCode): Promise<PendingData> {
        return await this.pendingDataDao.getByCode(code);
    }

    public async insertOrUpdate(pendingData: PendingData): Promise<void> {
        await this.pendingDataDao.insertOrUpdate(pendingData);
    }
}