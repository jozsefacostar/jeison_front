import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/components/material-components/material.module';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { UserComponentModule } from 'src/app/components/user/user.module';

@NgModule({
  declarations: [
    ListUserComponent,
    AdminUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    UserComponentModule
  ]
})
export class UserModule { }
