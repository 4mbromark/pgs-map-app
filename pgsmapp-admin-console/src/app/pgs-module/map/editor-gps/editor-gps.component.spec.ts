import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGpsComponent } from './editor-gps.component';

describe('EditorGpsComponent', () => {
  let component: EditorGpsComponent;
  let fixture: ComponentFixture<EditorGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
