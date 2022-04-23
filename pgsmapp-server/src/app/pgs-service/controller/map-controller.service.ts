import { PendingDataVersion } from './../../pgs-namespace/pending-data.namespace';
import { PendingDataService } from './../../pgs-database/service/pending-data.service';
import { Marker } from './../../pgs-database/schema/marker.schema';
import { Configuration } from './../../pgs-database/schema/configuration.schema';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/app/pgs-database/service/configuration.service';
import { MarkerService } from 'src/app/pgs-database/service/marker.service';
import { ConfigurationCode } from 'src/app/pgs-namespace/configuration.namespace';
import { CompleteMap, MapSetting, MapVersion } from './../../pgs-namespace/map.namespace';
import { PendingDataCode } from 'src/app/pgs-namespace/pending-data.namespace';
import { PendingData } from 'src/app/pgs-database/schema/pending-data.schema';

@Injectable()
export class MapControllerService {
    
    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly markerService: MarkerService,
        private readonly pendingDataService: PendingDataService
    ) {}

    public async getAdminMap(): Promise<CompleteMap> {
        const map: CompleteMap = new CompleteMap();
        map.version = await this.getVersion();

        const pendingFile: PendingData = await this.pendingDataService.getByCode(PendingDataCode.MAP_FILE);
        map.file = pendingFile ? pendingFile.value : await this.getFile();
        
        const pendingSettings: PendingData = await this.pendingDataService.getByCode(PendingDataCode.MAP_SETTINGS);
        map.settings = pendingSettings ? pendingSettings.value : await this.getSettings();

        const pendingMarkers: PendingData = await this.pendingDataService.getByCode(PendingDataCode.MAP_MARKERS);
        map.markers = pendingMarkers ? pendingMarkers.value : await this.getMarkers();

        map.pendingDataVersion = await this.getPendingDataVersion();
        return map;
    }

    public async getVersion(): Promise<MapVersion> {
        const mapVersion: Configuration = await this.configurationService.getByCode(ConfigurationCode.MAP_VERSION);
        return mapVersion ? mapVersion.value : new MapVersion();   
    }

    public async getFile(): Promise<File> {
        const mapFile: Configuration = await this.configurationService.getByCode(ConfigurationCode.MAP_FILE);
        return mapFile ? mapFile.value : null;   
    }

    public async getSettings(): Promise<MapSetting> {
        const mapSettings: Configuration = await this.configurationService.getByCode(ConfigurationCode.MAP_SETTINGS);
        return mapSettings ? mapSettings.value : null;   
    }

    public async getMarkers(): Promise<Marker[]> {
        return await this.markerService.getAll();
    }

    public async setPendingFile(file: string): Promise<void> {
        const pendingDataVersion: PendingDataVersion = await this.getPendingDataVersion();
        pendingDataVersion.mapFile++;

        await this.setPendingDataAndUpdateVersion(PendingDataCode.MAP_FILE, file, pendingDataVersion);
    }

    public async setPendingSettings(settings: MapSetting): Promise<void> {
        const pendingDataVersion: PendingDataVersion = await this.getPendingDataVersion();
        pendingDataVersion.mapSettings++;

        await this.setPendingDataAndUpdateVersion(PendingDataCode.MAP_SETTINGS, settings, pendingDataVersion);
    }

    public async setPendingMarkers(markers: Marker[]): Promise<void> {
        const pendingDataVersion: PendingDataVersion = await this.getPendingDataVersion();
        pendingDataVersion.mapMarkers++;

        await this.setPendingDataAndUpdateVersion(PendingDataCode.MAP_MARKERS, markers, pendingDataVersion);
    }

    private async setPendingDataAndUpdateVersion(code: PendingDataCode, value: any, pendingDataVersion: PendingDataVersion): Promise<void> {
        const pendingData: PendingData = new PendingData();
        pendingData.code = code;
        pendingData.value = value;

        await this.pendingDataService.insertOrUpdate(pendingData);
        await this.updatePendingDataVersion(pendingDataVersion);
    }

    private async getPendingDataVersion(): Promise<PendingDataVersion> {
        const pendingDataVersion: PendingData = await this.pendingDataService.getByCode(PendingDataCode.VERSION);
        return pendingDataVersion ? pendingDataVersion.value : new PendingDataVersion();   
    }

    private async updatePendingDataVersion(pendingDataVersion: PendingDataVersion): Promise<void> {
        const pendingData: PendingData = new PendingData();
        pendingData.code = PendingDataCode.VERSION;
        pendingData.value = pendingDataVersion;

        await this.pendingDataService.insertOrUpdate(pendingData);
    }
}   