import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
