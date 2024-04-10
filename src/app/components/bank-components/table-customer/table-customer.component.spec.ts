import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCustomerComponent } from './table-customer.component';

describe('TableCustomerComponentComponent', () => {
  let component: TableCustomerComponent;
  let fixture: ComponentFixture<TableCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCustomerComponent]
    });
    fixture = TestBed.createComponent(TableCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
