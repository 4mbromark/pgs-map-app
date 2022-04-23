import { DeviceService } from './pgs-service/device.service';
import { Component, HostListener } from '@angular/core';
import { DeviceInfo } from './pgs-namespace/device.namepsace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pgsmapp-client-app';

  constructor(
    private readonly deviceService: DeviceService
  ) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    this.deviceService.setDeviceInfo(window);
  }
}
