import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-components/material.module';
import { NgModule } from '@angular/core';
import { FormUserComponent } from './form-user/form-user.component';
import { TableUserComponent } from './table-user/table-user.component';

@NgModule({
  declarations: [
    FormUserComponent,
    TableUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormUserComponent,
    TableUserComponent
  ]
})
export class UserComponentModule { }
