import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersManagement } from './admin-orders-management';

describe('AdminOrdersManagement', () => {
  let component: AdminOrdersManagement;
  let fixture: ComponentFixture<AdminOrdersManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrdersManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
