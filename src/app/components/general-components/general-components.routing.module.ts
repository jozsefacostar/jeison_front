import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponentComponent } from './menu-component/menu-component.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralComponentsRoutingModule { }
