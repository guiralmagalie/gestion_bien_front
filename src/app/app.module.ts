import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PrivateLayout } from "./layout/private-layout/private-layout";
import { LucideAngularModule, TrendingUp, AlertTriangle, DollarSign, Box } from 'lucide-angular';


@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NavbarComponent,
    FontAwesomeModule,
    BrowserAnimationsModule, // obligatoire
    ToastrModule.forRoot({ positionClass: 'toast-top-right', timeOut: 3000 }),
    SidebarComponent,
    PrivateLayout,
    Login,
    LucideAngularModule.pick({ TrendingUp, AlertTriangle, DollarSign, Box })
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
