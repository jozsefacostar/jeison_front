import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { MaterialModule } from '../material-components/material.module';
import { NgModule } from '@angular/core';
import { TableCustomerComponent } from './table-customer/table-customer.component';
import { TransactionsByUserComponent } from './transactions-by-user/transactions-by-user.component';
import { RelatedComponent } from 'src/app/pages/bank/related/related.component';
import { CancelComponent } from 'src/app/pages/bank/cancel/cancel.component';
import { SearchMarketingComponent } from './search-marketing/search-marketing.component';
import { ProjectionsComponent } from 'src/app/pages/bank/projections/projections.component';

@NgModule({
  declarations: [
    FormCustomerComponent,
    TableCustomerComponent,
    TransactionsByUserComponent,
    RelatedComponent,
    CancelComponent,
    SearchMarketingComponent,
    ProjectionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormCustomerComponent,
    TableCustomerComponent,
    TransactionsByUserComponent,
    RelatedComponent,
    CancelComponent,
    SearchMarketingComponent,
    ProjectionsComponent
  ]
})
export class BankComponentsModule { }
