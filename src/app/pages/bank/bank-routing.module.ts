import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProjectionsComponent } from './projections/projections.component';
import { RelatedComponent } from './related/related.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CancelComponent } from './cancel/cancel.component';
import { SearchMarketingComponent } from 'src/app/components/bank-components/search-marketing/search-marketing.component';

const routes: Routes = [
  {
    path: 'relate',
    component: RelatedComponent
  },
  {
    path: 'cancel',
    component: CancelComponent
  },
  {
    path: 'search-marketing',
    component: SearchMarketingComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'projections',
    component: ProjectionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
