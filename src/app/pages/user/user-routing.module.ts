import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUserComponent } from './list-user/list-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListUserComponent
  },
  {
    path: 'new-user',
    component: AdminUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
