import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiltersComponent } from './home-filters.component';

describe('HomeFiltersComponent', () => {
  let component: HomeFiltersComponent;
  let fixture: ComponentFixture<HomeFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
