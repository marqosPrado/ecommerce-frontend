import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWallet } from './client-wallet';

describe('ClientWallet', () => {
  let component: ClientWallet;
  let fixture: ComponentFixture<ClientWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
