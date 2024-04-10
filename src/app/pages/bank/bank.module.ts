import { BankComponentsModule } from 'src/app/components/bank-components/bank-components.module';
import { BankRoutingModule } from './bank-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectionsComponent } from './projections/projections.component';
import { RelatedComponent } from './related/related.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    BankComponentsModule
  ]
})
export class BankModule { }
