import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakPeekComponent } from './sneak-peek.component';

describe('SneakPeekComponent', () => {
  let component: SneakPeekComponent;
  let fixture: ComponentFixture<SneakPeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakPeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakPeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
