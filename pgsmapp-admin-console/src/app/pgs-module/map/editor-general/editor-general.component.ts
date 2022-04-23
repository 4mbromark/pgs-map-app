import { MapSetting } from './../../../pgs-namespace/map.namespace';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-editor-general',
  templateUrl: './editor-general.component.html',
  styleUrls: ['./editor-general.component.css']
})
export class EditorGeneralComponent implements OnInit {
  @Input() settings: MapSetting;
  @Output() settingsChange: EventEmitter<MapSetting> = new EventEmitter<MapSetting>();

  constructor() { }

  ngOnInit(): void {
  }

  public setSettings(): void {
    this.settingsChange.emit(this.settings);
  }
}
