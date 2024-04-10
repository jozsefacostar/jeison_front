import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { BankComponentsModule } from 'src/app/components/bank-components/bank-components.module';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { MaterialModule } from 'src/app/components/material-components/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ListCustomerComponent,
    AdminCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    BankComponentsModule
  ]
})
export class CustomerModule { }
