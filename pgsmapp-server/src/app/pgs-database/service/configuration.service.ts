import { ConfigurationCode } from '../../pgs-namespace/configuration.namespace';
import { ConfigurationDao } from '../dao/configuration.dao';
import { Injectable } from '@nestjs/common';
import { Configuration } from '../schema/configuration.schema';

@Injectable()
export class ConfigurationService {

    constructor(
        private readonly configurationDao: ConfigurationDao
    ) {}

    public async getByCode(code: ConfigurationCode): Promise<Configuration> {
        return await this.configurationDao.getByCode(code);
    }

    public async update(code: ConfigurationCode, value: any): Promise<void> {
        await this.configurationDao.update(code, value);
    }
}