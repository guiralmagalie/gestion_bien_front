import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Login } from './pages/login/login';
import PublicLayout from './layout/public-layout/public-layout';
import { PrivateLayout } from './layout/private-layout/private-layout';
import { authGuard } from './guards/auth.guard';
import { CommandeFormComponent } from './pages/acquisitions/commande-form/commande-form.component';
import { FournisseurFormComponent } from './pages/acquisitions/fournisseur-form/fournisseur-form.component';
import { UserComponent } from './pages/users/user.component';

const routes: Routes = [

  // 🟢 1. QUAND on est sur "/" → on redirige vers "/login"
  //    (ou vers /app/dashboard si déjà connecté)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔓 2. ROUTES PUBLIQUES
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'login', component: Login },
    ]
  },

  // 🔐 3. ROUTES PRIVÉES
  {
    path: 'app',
    canActivate: [authGuard],
    component: PrivateLayout,
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard-module').then(m => m.DashboardModule) },
      { path: 'acquisitions', loadChildren: () => import('./pages/acquisitions/acquisitions-module').then(m => m.AcquisitionsModule) },
      { path: 'assets', loadChildren: () => import('./pages/assets/assets-module').then(m => m.AssetsModule) },
      { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory-module').then(m => m.InventoryModule) },
      { path: 'maintenance', loadChildren: () => import('./pages/maintenance/maintenance-module').then(m => m.MaintenanceModule) },
      { path: 'stats', loadChildren: () => import('./pages/reports/reports-module').then(m => m.ReportsModule) },
      { path: 'users', component: UserComponent},


      // Redirection interne du layout privé
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },


  // 🛑 4. PAGE 404
  { path: '**', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
