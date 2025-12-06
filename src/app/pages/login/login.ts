import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  login() {
  if (!this.username || !this.password) {
    this.errorMessage = 'Veuillez saisir le nom d’utilisateur et le mot de passe.';
    return;
  }

  this.auth.login(this.username, this.password).subscribe({
    next: () => {
      this.errorMessage = '';
      this.toastr.success('Connexion réussie !');
      this.router.navigate(['/app/dashboard']);
    },
    error: () => {
      this.errorMessage = 'Identifiant ou mot de passe incorrect.';
    }
  });
}

}
