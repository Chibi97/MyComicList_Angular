import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicFormComponent } from './comic-form.component';

describe('ComicFormComponent', () => {
  let component: ComicFormComponent;
  let fixture: ComponentFixture<ComicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
