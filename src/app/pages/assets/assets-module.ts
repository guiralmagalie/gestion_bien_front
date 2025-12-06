import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing-module';
import { Assets } from './assets';
import { AssetDetail } from './asset-detail/asset-detail';
import { FormsModule } from '@angular/forms';
import { AssetForm } from './asset-form/asset-form';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    Assets,
    AssetDetail,
    AssetForm,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AssetsRoutingModule,
    FaIconComponent
]
})
export class AssetsModule { }
