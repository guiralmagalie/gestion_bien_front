import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./inventory').then(m => m.InventoryComponent) },
  { path: 'new', loadComponent: () => import('./inventory-form/inventory-form').then(m => m.InventoryForm) },
  { path: 'edit/:id', loadComponent: () => import('./inventory-form/inventory-form').then(m => m.InventoryForm) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
