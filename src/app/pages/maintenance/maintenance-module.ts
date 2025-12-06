import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing-module';
import { MaintenanceComponent } from './maintenance';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
