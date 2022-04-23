import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCoordinatesEditorComponent } from './standard-coordinates-editor.component';

describe('StandardCoordinatesEditorComponent', () => {
  let component: StandardCoordinatesEditorComponent;
  let fixture: ComponentFixture<StandardCoordinatesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardCoordinatesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardCoordinatesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
