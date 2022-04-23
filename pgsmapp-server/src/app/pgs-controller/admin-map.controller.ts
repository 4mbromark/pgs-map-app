import { MapControllerService } from '../pgs-service/controller/map-controller.service';
import { Controller, Get, HttpException, HttpStatus, Logger, Param, Put, Res } from "@nestjs/common";
import { Response } from 'express';
import { CompleteMap, MapSetting } from '../pgs-namespace/map.namespace';

@Controller('/admin/map')
export class AdminMapController {
    private readonly logger = new Logger(AdminMapController.name);

    constructor(
        private readonly mapControllerService: MapControllerService
    ) {}

    @Get()
    public async getMap(@Res() res: Response) {
        this.logger.log('getMap > New request');

        try {
            const map: CompleteMap = await this.mapControllerService.getAdminMap();
            const httpStatus = map ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(httpStatus).send(map);
            this.logger.log('getMap > Response sent');
        } catch (e) {
            if (e instanceof HttpException) { throw e; }
            this.logger.error(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
            this.logger.log('getMap > Error response sent');
        }
    }

    @Put()
    public async uploadFile(@Res() res: Response) {
        this.logger.log('uploadFile > New request');

        try {
            await this.mapControllerService.setPendingFile('');
            res.status(HttpStatus.OK).send();
            this.logger.log('uploadFile > Response sent');
        } catch (e) {
            if (e instanceof HttpException) { throw e; }
            this.logger.error(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
            this.logger.log('uploadFile > Error response sent');
        }
    }

    @Put()
    public async changeSettings(@Res() res: Response) {
        this.logger.log('changeSettings > New request');

        try {
            await this.mapControllerService.setPendingSettings(new MapSetting());
            res.status(HttpStatus.OK).send();
            this.logger.log('changeSettings > Response sent');
        } catch (e) {
            if (e instanceof HttpException) { throw e; }
            this.logger.error(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
            this.logger.log('changeSettings > Error response sent');
        }
    }
}