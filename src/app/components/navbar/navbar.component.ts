import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars, faTimes, faChevronDown, faSignOutAlt,
  faTachometerAlt, faShoppingCart, faBox, faClipboardList,
  faWrench, faChartLine
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
    private router: Router   // ⬅️ AJOUT IMPORTANT
  ) {}

  menuOpen = false;
  userMenuOpen = false;

  faMenu = faBars;
  faClose = faTimes;
  faChevronDown = faChevronDown;
  faSignOut = faSignOutAlt;
  faDashboard = faTachometerAlt;
  faAcquisition = faShoppingCart;
  faAssets = faBox;
  faInventory = faClipboardList;
  faMaintenance = faWrench;
  faStats = faChartLine;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.userMenuOpen = false;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.menuOpen = false;
  }

  logout() {
    this.userMenuOpen = false;

    this.auth.logout();  // ⬅️ SUPPRESSION du double logout

    this.router.navigate(['/login']); // ⬅️ maintenant fonctionne
  }
}
