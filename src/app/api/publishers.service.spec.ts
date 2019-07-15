import { TestBed } from '@angular/core/testing';

import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishersService = TestBed.get(PublishersService);
    expect(service).toBeTruthy();
  });
});
