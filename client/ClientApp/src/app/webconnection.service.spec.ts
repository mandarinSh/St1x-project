import { TestBed } from '@angular/core/testing';

import { WebconnectionService } from './webconnection.service';

describe('WebconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebconnectionService = TestBed.get(WebconnectionService);
    expect(service).toBeTruthy();
  });
});
