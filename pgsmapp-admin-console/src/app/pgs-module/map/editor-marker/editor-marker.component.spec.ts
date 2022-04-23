import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMarkerComponent } from './editor-marker.component';

describe('EditorMarkerComponent', () => {
  let component: EditorMarkerComponent;
  let fixture: ComponentFixture<EditorMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
