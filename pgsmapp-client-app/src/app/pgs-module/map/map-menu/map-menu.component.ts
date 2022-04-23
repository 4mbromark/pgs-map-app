import { MapService } from './../map.service';
import { DeviceService } from './../../../pgs-service/device.service';
import { Component, OnInit } from '@angular/core';
import { DeviceInfo } from 'src/app/pgs-namespace/device.namepsace';

@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.css']
})
export class MapMenuComponent implements OnInit {

  public buttonSize: number = 45;
  public iconSize: 'sm' | 'lg' = 'lg';

  constructor(
    private readonly mapService: MapService,
    private readonly deviceService: DeviceService,
  ) { }

  ngOnInit(): void {
    this.deviceService.getDeviceInfo().subscribe((info: DeviceInfo) => {
      this.calculateButtonSize(info.width);
    });
  }

  private calculateButtonSize(deviceWidth: number): void {
    let buttonSize = deviceWidth / 8;
    buttonSize = buttonSize <= 60 ? buttonSize : 60;
    buttonSize = buttonSize >= 40 ? buttonSize : 40;
    this.buttonSize = buttonSize;
    // this.iconSize = buttonSize < 45 ? 'sm' : 'lg';
  }
}
