import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'list',
    component: ListCustomerComponent
  },
  {
    path: 'new-customer',
    component: AdminCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
