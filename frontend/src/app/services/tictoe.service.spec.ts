import { TestBed } from '@angular/core/testing';

import { TictoeService } from './tictoe.service';

describe('TictoeService', () => {
  let service: TictoeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TictoeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
