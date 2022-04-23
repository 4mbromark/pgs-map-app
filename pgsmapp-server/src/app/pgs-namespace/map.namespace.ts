import { PendingDataVersion } from './pending-data.namespace';
import { Marker } from "../pgs-database/schema/marker.schema";

export class Coordinate {
    lng: number;
    lat: number;
}

export class CompleteMap {
    version: MapVersion;
    file: any;
    settings: MapSetting;
    markers: Marker[];
    pendingDataVersion: PendingDataVersion;
}

export class MapVersion {
    file: Date = new Date();
    setting: Date = new Date();
    marker: Date = new Date();
}

export class MapSetting {
    enabled: boolean = false;
    center: Coordinate;
    centerAuto: boolean = true;
    rotation: number = 0;
    zoom: number = 15;
    zoomMin: number = 14;
    zoomMax: number = 18;
    border: number = 0.010;
    anchorNw: Coordinate = { lng: 10.726446, lat: 45.367669};
    anchorNe: Coordinate = { lng: 10.737201, lat: 45.366124};
    anchorSe: Coordinate = { lng: 10.735765, lat: 45.355269};
    anchorSw: Coordinate = { lng: 10.726260, lat: 45.355186};
    gpsEnabled: boolean = false;
}
