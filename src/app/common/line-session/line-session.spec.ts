import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSession } from './line-session';

describe('LineSession', () => {
  let component: LineSession;
  let fixture: ComponentFixture<LineSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
