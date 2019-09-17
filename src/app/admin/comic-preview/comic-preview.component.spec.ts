import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicPreviewComponent } from './comic-preview.component';

describe('ComicPreviewComponent', () => {
  let component: ComicPreviewComponent;
  let fixture: ComponentFixture<ComicPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
