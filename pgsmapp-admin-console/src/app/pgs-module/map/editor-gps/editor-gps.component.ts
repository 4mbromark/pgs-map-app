import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapSetting } from 'src/app/pgs-namespace/map.namespace';

@Component({
  selector: 'app-editor-gps',
  templateUrl: './editor-gps.component.html',
  styleUrls: ['./editor-gps.component.css']
})
export class EditorGpsComponent implements OnInit {
  @Input() settings: MapSetting;
  @Output() settingsChange: EventEmitter<MapSetting> = new EventEmitter<MapSetting>();

  constructor() { }

  ngOnInit(): void {
  }

  public setSettings(): void {
    this.settingsChange.emit(this.settings);
  }
}
