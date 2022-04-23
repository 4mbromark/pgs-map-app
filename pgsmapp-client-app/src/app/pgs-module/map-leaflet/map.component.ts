import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as llm from 'leaflet';

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = llm.map('map', {
      center: [45.36151, 10.73185],
      minZoom: 15,
      maxZoom: 18,
      zoom: 16
    });


    llm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      rotate: true,
      touchRotate: true,
      rotateControl: {
        closeOnZeroBearing: false
      }
    }).addTo(this.map);


    const bounds = [[45.35520, 10.72670], [45.36639, 10.73600]];

    const image = llm.imageOverlay(
      'assets/map/pgs-map-file.jpg',
      bounds,
      { opacity: 0.4 }
    ).addTo(this.map);

  }
}
