import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapSetting } from 'src/app/pgs-namespace/map.namespace';

@Component({
  selector: 'app-editor-image',
  templateUrl: './editor-image.component.html',
  styleUrls: ['./editor-image.component.css']
})
export class EditorImageComponent implements OnInit {
  @Input() settings: MapSetting;
  @Output() settingsChange: EventEmitter<MapSetting> = new EventEmitter<MapSetting>();
  @Input() file: string;

  constructor() { }

  ngOnInit(): void {
  }
}
