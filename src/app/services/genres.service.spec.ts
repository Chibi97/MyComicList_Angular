import { TestBed } from '@angular/core/testing';

import { GenresService } from './genres.service';

describe('GenresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenresService = TestBed.get(GenresService);
    expect(service).toBeTruthy();
  });
});
