import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGauge, faCartShopping, faBox, faClipboard, faWrench, faChartLine, faBars, faXmark , faUsers} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuOpen = false;

  faDashboard = faGauge;
  faAcquisition = faCartShopping;
  faAssets = faBox;
  faInventory = faClipboard;
  faMaintenance = faWrench;
  faStats = faChartLine;
  faMenu = faBars;
  faClose = faXmark;
  faUsers = faUsers;

navItems: NavItem[] = [
  { path: '/app/dashboard', label: 'Tableau de bord', icon: this.faDashboard },
  { path: '/app/acquisitions', label: 'Acquisitions', icon: this.faAcquisition },
  { path: '/app/assets', label: 'Biens', icon: this.faAssets },
  { path: '/app/inventory', label: 'Inventaires', icon: this.faInventory },
  { path: '/app/maintenance', label: 'Maintenance', icon: this.faMaintenance },
  { path: '/app/users', label: 'Utilisateurs', icon: this.faUsers },

];

  constructor(public auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.auth.logout();
  }
   get currentPageLabel(): string {
    const item = this.navItems.find(i => i.path === this.router.url);
    return item ? item.label : 'Gestion des Biens';
  }
}
