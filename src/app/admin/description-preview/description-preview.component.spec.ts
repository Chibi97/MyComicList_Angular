import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPreviewComponent } from './description-preview.component';

describe('DescriptionPreviewComponent', () => {
  let component: DescriptionPreviewComponent;
  let fixture: ComponentFixture<DescriptionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
