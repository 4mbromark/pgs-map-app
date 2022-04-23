import { Coordinate } from './../../../pgs-namespace/map.namespace';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-standard-coordinates-editor',
  templateUrl: './standard-coordinates-editor.component.html',
  styleUrls: ['./standard-coordinates-editor.component.css']
})
export class StandardCoordinatesEditorComponent implements OnInit {
  @Input() coordinate: Coordinate;
  @Output() coordinateChange: EventEmitter<Coordinate> = new EventEmitter<Coordinate>();

  constructor() { }

  ngOnInit(): void {
  }

  public setCoordinate(): void {
    this.coordinateChange.emit(this.coordinate);
  }
}
