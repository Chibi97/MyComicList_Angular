import { TestBed } from '@angular/core/testing';

import { ComicsService } from './comics.service';

describe('ComicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComicsService = TestBed.get(ComicsService);
    expect(service).toBeTruthy();
  });
});
