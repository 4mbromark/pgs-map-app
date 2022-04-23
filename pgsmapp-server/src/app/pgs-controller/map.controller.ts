import { MapControllerService } from './../pgs-service/controller/map-controller.service';
import { Controller, Get, HttpException, HttpStatus, Logger, Param, Res } from "@nestjs/common";
import { Response } from 'express';
import { MapVersion } from '../pgs-namespace/map.namespace';

@Controller('/map')
export class MapController {
    private readonly logger = new Logger(MapController.name);

    constructor(
        private readonly mapControllerService: MapControllerService
    ) {}

    @Get('/version')
    public async getVersion(@Res() res: Response) {
        this.logger.log('getVersion > New request');

        try {
            const mapVersion: MapVersion = await this.mapControllerService.getVersion();
            const httpStatus = mapVersion ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(httpStatus).send(mapVersion);
            this.logger.log('getVersion > Response sent');
        } catch (e) {
            if (e instanceof HttpException) { throw e; }
            this.logger.error(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
            this.logger.log('getVersion > Error response sent');
        }
    }

    @Get('/marker')
    public async getMarkers(@Res() res: Response) {
        this.logger.log('getMarkers > New request');

        try {
            const markerList = await this.mapControllerService.getMarkers();
            const httpStatus = markerList ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(httpStatus).send(markerList);
            this.logger.log('getMarkers > Response sent');
        } catch (e) {
            if (e instanceof HttpException) { throw e; }
            this.logger.error(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
            this.logger.log('getMarkers > Error response sent');
        }
    }
}