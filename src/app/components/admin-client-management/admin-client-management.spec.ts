import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientManagement } from './admin-client-management';

describe('AdminClientManagement', () => {
  let component: AdminClientManagement;
  let fixture: ComponentFixture<AdminClientManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClientManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClientManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
