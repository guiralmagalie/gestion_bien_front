import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assets } from './assets';
import { AssetList } from './asset-list/asset-list';
import { AssetDetail } from './asset-detail/asset-detail';
import { AssetResolver } from './resolvers/asset-resolver';
import { AssetForm } from './asset-form/asset-form';

const routes: Routes = [
  { path: '', component: Assets },
  { path: 'new', component: AssetForm },
  { path: 'edit/:id', component: AssetForm, resolve: { asset: AssetResolver } },
  { path: 'view/:id', component: AssetDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
