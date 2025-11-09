import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientExchangeVouchers } from './client-exchange-vouchers';

describe('ClientExchangeVouchers', () => {
  let component: ClientExchangeVouchers;
  let fixture: ComponentFixture<ClientExchangeVouchers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientExchangeVouchers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientExchangeVouchers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
