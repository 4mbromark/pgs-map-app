import { CompleteMap } from './../../pgs-namespace/map.namespace';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient
  ) { }

  public getMap(): Promise<CompleteMap> {
    return new Promise<CompleteMap>((resolve, reject) => {
      this.http.get('/pgsm-api/admin/map', { responseType: 'json' }).subscribe((map: CompleteMap) => {
        resolve(map);
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    });
  }
}
