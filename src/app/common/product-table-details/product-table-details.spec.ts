import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableDetails } from './product-table-details';

describe('ProductTableDetails', () => {
  let component: ProductTableDetails;
  let fixture: ComponentFixture<ProductTableDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTableDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
