import { Storage } from './../../pgs-namespace/storage.namespace';
import { StorageService } from './../../pgs-service/storage.service';
import { MapMarker } from './../../pgs-server/object/marker';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  public loadInfoFromServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      const mapVersionCode: string = this.storageService.get(Storage.MAP_VERSION_CODE);
      this.checkVersion(mapVersionCode).then(async (newVersion: string) => {
        if (newVersion) {
          await this.updateMarkers(newVersion);
        }
        resolve();
      });
    })
  }

  public getMarkerList(): MapMarker[] {
    return this.storageService.getObject(Storage.MAP_MARKER_LIST);
  }

  private checkVersion(code: string = '0'): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get('/pgsm-api/map/check-version/' + code, { responseType: 'json' }).subscribe((newVersion: string) => {
        resolve(newVersion);
      },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  private async updateMarkers(code: string): Promise<void> {
    await this.fetchMarkers().then((mapMarkerList) => {
      this.storageService.setObject(Storage.MAP_MARKER_LIST, mapMarkerList);
      this.storageService.set(Storage.MAP_VERSION_CODE, code);
    });
  }

  private fetchMarkers(): Promise<MapMarker[]> {
    return new Promise((resolve, reject) => {
      this.http.get('/pgsm-api/map/marker', { responseType: 'json' }).subscribe((mapMarkerList: MapMarker[]) => {
        resolve(mapMarkerList);
      },
      (error: HttpErrorResponse) => {
        reject(error);
      });
    });
  }
}
