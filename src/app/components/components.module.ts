import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-components/material.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class ComponentsModule { }
