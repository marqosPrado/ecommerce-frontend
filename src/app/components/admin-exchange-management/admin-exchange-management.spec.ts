import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExchangeManagement } from './admin-exchange-management';

describe('AdminExchangeManagement', () => {
  let component: AdminExchangeManagement;
  let fixture: ComponentFixture<AdminExchangeManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExchangeManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExchangeManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
