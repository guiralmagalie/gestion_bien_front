import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseChartDirective } from 'ng2-charts'

@NgModule({
  declarations: [Dashboard],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    BaseChartDirective
  ],
})
export class DashboardModule {}
