export enum PendingDataCode {
    VERSION = 'VERSION',
    MAP_FILE = 'MAP_FILE',
    MAP_SETTINGS = 'MAP_SETTINGS',
    MAP_MARKERS = 'MAP_MARKERS'
}

export class PendingDataVersion {
    mapFile: number = 0;
    mapSettings: number = 0;
    mapMarkers: number = 0;
}