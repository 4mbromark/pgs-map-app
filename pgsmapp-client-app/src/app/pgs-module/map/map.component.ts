import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DeviceInfo } from 'src/app/pgs-namespace/device.namepsace';
import { DeviceService } from 'src/app/pgs-service/device.service';
import { MapService } from './map.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapMarker } from 'src/app/pgs-server/object/marker';

@Component({
  selector: 'app-map',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        top: '3%',
        bottom: '4%'
      })),
      state('closed', style({
        top: '100%',
        bottom: '0%'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  isOpen = false;

  /* private coordinates = {
    nw: [10.72740, 45.36760], // top-left
    ne: [10.73730, 45.36660], // top-right
    se: [10.73540, 45.35535], // bottom-right
    sw: [10.72670, 45.35530]  // bottom-left
  }; */

  private coordinates = {
    nw: [10.726446, 45.367669], // top-left
    ne: [10.737201, 45.366124], // top-right
    se: [10.735765, 45.355269], // bottom-right
    sw: [10.726260, 45.355186]  // bottom-left
  };

  public buttonSize: number = 45;
  public iconSize: 'sm' | 'lg' = 'lg';

  constructor(
    private readonly mapService: MapService,
    private readonly deviceService: DeviceService
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.buildMap();
    this.mapService.loadInfoFromServer().then(() => {
      this.addMarkersToMap();
    }).catch((err) => {

    });
    this.deviceService.getDeviceInfo().subscribe((info: DeviceInfo) => {
      this.calculateButtonSize(info.width);
    });
  }

  private buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'pgs-map',
      style: this.style,
      minZoom: 14,
      maxZoom: 18,
      zoom: 15,
      center: [
        this.coordinates.se[0] + ((this.coordinates.nw[0] - this.coordinates.se[0]) / 2),
        this.coordinates.se[1] + ((this.coordinates.nw[1] - this.coordinates.se[1]) / 2),
      ],
      maxBounds: [
        [
          this.coordinates.sw[0] - 0.010,
          this.coordinates.sw[1] - 0.010
        ],
        [
          this.coordinates.ne[0] + 0.010,
          this.coordinates.ne[1] + 0.010
        ]
      ],
      bearing: 4,
      bearingSnap: 0
    });

    this.map.on('load', () => {
      this.map.addSource('radar', {
        type: 'image',
        url: 'assets/map/pgs-map-file.jpg',
        coordinates: [
          this.coordinates.nw,
          this.coordinates.ne,
          this.coordinates.se,
          this.coordinates.sw
        ]
      });

      this.map.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-opacity': 0.5
        }
      });
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private addMarkersToMap(): void {
    const mapMarkerList: MapMarker[] = this.mapService.getMarkerList();

    for (const mapMarker of mapMarkerList) {
      new mapboxgl.Marker()
        .setLngLat([mapMarker.lng, mapMarker.lat])
        .setPopup(new mapboxgl.Popup().setHTML('<h1>Hello World!</h1>')) // add popup
        .addTo(this.map);
    }
  }

  private calculateButtonSize(deviceWidth: number): void {
    let buttonSize = deviceWidth / 8;
    buttonSize = buttonSize <= 60 ? buttonSize : 60;
    buttonSize = buttonSize >= 40 ? buttonSize : 40;
    this.buttonSize = buttonSize;
    // this.iconSize = buttonSize < 45 ? 'sm' : 'lg';
  }

  public openMenu(): void {
    this.isOpen = true;
  }
}
