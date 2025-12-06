import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
path: '',
component: Dashboard,
canActivate: [authGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
