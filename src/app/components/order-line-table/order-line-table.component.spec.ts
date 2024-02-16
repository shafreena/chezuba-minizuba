import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineTableComponent } from './order-line-table.component';

describe('OrderLineTableComponent', () => {
  let component: OrderLineTableComponent;
  let fixture: ComponentFixture<OrderLineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLineTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderLineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
