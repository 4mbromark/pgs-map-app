import { PendingDataVersion } from './../../pgs-namespace/pending-data.namespace';
import { CompleteMap, MapSetting } from './../../pgs-namespace/map.namespace';
// tslint:disable: no-inferrable-types
import { MapService } from './map.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mape') element: ElementRef;

  private mapbox: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';

  public map: CompleteMap;

  public loading: boolean = true;
  public problems: string[] = [];

  constructor(
    private mapService: MapService,
    private noticationsService: NotificationsService
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    this.loading = true;
    this.mapService.getMap().then((map: CompleteMap) => {
      this.map = map;

      if (!this.map.settings) {
        this.map.settings = new MapSetting();
        this.showWarning('Configurazioni mancanti. Verranno caricate quelle di default.');
      }
      if (!this.map.file) {
        this.showWarning('Nessun file mappa disponibile.');
      }
      if (!this.map.settings.enabled) {
        this.showWarning('La mappa è disabilitata. Gli utenti non possono accedervi.');
      }
      if (this.isMapUnsaved()) {
        this.showWarning('Ci sono delle modifiche non salvate.');
      }
      this.loading = false;
      this.buildMap();
    });
  }

  private buildMap(): void {
    this.mapbox = new mapboxgl.Map({
      container: this.element.nativeElement,
      style: this.style,
      bearingSnap: 0
    });

    /* this.mapbox.on('load', () => {
      this.mapbox.addSource('radar', {
        type: 'image',
        url: 'assets/map/pgs-map-file.jpg',
        coordinates: [
          [ settings.anchorNw.lng, settings.anchorNw.lat ],
          [ settings.anchorNe.lng, settings.anchorNe.lat ],
          [ settings.anchorSe.lng, settings.anchorSe.lat ],
          [ settings.anchorSw.lng, settings.anchorSw.lat ]
        ]
      });

      this.mapbox.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-opacity': 0.5
        }
      });
    }); */

    this.mapbox.addControl(new mapboxgl.NavigationControl());
    this.setMapSettings();
  }

  public setMapSettings(): void {
    const settings = this.map.settings;

    this.mapbox.getMinZoom() === settings.zoomMin || this.mapbox.setMinZoom(settings.zoomMin);
    this.mapbox.getMaxZoom() === settings.zoomMax || this.mapbox.setMaxZoom(settings.zoomMax);
    this.mapbox.getZoom() === settings.zoom || this.mapbox.setZoom(settings.zoom);

    const center = settings.centerAuto ? [
      settings.anchorSe.lng + ((settings.anchorNw.lng - settings.anchorSe.lng) / 2),
      settings.anchorSe.lat + ((settings.anchorNw.lat - settings.anchorSe.lat) / 2),
    ] : [ settings.center.lng, settings.center.lat ];
    this.mapbox.getCenter() === center || this.mapbox.setCenter(center);
    !settings.centerAuto || (this.map.settings.center = { lng: center[0], lat: center[1] });

    const maxBounds = [
      [
        settings.anchorSw.lng - settings.border,
        settings.anchorSw.lat - settings.border
      ],
      [
        settings.anchorNe.lng + settings.border,
        settings.anchorNe.lat + settings.border
      ]
    ]
    this.mapbox.getMaxBounds() == maxBounds || this.mapbox.setMaxBounds(maxBounds);

    this.mapbox.getBearing() === settings.rotation || this.mapbox.setBearing(settings.rotation);

    /* this.mapbox.on('load', () => {
      this.mapbox.addSource('radar', {
        type: 'image',
        url: 'assets/map/pgs-map-file.jpg',
        coordinates: [
          [ settings.anchorNw.lng, settings.anchorNw.lat ],
          [ settings.anchorNe.lng, settings.anchorNe.lat ],
          [ settings.anchorSe.lng, settings.anchorSe.lat ],
          [ settings.anchorSw.lng, settings.anchorSw.lat ]
        ]
      });

      this.mapbox.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-opacity': 0.5
        }
      });
    }); */
  }

  private showWarning(message: string): void {
    this.noticationsService.warn(message);
  }

  public isMapUnsaved(): boolean {
    const pdv: PendingDataVersion = this.map.pendingDataVersion;
    return pdv.mapFile > 0 || pdv.mapSettings > 0 || pdv.mapMarkers > 0;
  }
}
