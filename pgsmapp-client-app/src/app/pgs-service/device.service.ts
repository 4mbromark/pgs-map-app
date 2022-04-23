import { DeviceInfo } from './../pgs-namespace/device.namepsace';
import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private info: ReplaySubject<DeviceInfo> = new ReplaySubject<DeviceInfo>();

  constructor() {}

  public getDeviceInfo(): Observable<DeviceInfo> {
    return this.info.asObservable();
  }

  public setDeviceInfo(window: any): void {
    const info: DeviceInfo = new DeviceInfo();
    info.width = window.innerWidth;
    info.height = window.innerHeight;

    this.info.next(info);
  }
}
