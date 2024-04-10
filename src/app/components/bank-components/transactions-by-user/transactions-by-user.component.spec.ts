import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsByUserComponent } from './transactions-by-user.component';

describe('TransactionsByUserComponent', () => {
  let component: TransactionsByUserComponent;
  let fixture: ComponentFixture<TransactionsByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsByUserComponent]
    });
    fixture = TestBed.createComponent(TransactionsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
