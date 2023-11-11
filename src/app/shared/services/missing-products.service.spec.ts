import { TestBed } from '@angular/core/testing';

import { MissingProductsService } from './missing-products.service';

describe('MissingProductsService', () => {
  let service: MissingProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissingProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
