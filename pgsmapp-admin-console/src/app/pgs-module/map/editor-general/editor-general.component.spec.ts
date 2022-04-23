import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGeneralComponent } from './editor-general.component';

describe('EditorGeneralComponent', () => {
  let component: EditorGeneralComponent;
  let fixture: ComponentFixture<EditorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
