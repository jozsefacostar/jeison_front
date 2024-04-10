import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { MenuComponentComponent } from './components/general-components/menu-component/menu-component.component';
import { AuthGuard } from './common/guards/auth.guard';
import { NoAuthGuard } from './common/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponentComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: 'customer/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
