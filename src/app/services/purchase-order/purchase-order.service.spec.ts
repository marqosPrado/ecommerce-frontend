import { TestBed } from '@angular/core/testing';

import { PurchaseOrderService } from './purchase-order.service.ts';

describe('PurchaseOrderServiceTs', () => {
  let service: PurchaseOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
