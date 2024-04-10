import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-components/material.module';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MenuComponentComponent
  ]
})
export class GeneralComponentsModule { }
