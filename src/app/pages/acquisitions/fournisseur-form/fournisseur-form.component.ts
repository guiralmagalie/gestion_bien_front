import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService, Fournisseur } from '../../../services/db.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fournisseur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit {

  fournisseurForm!: FormGroup;
  fournisseurId?: number;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  constructor(
    private db: DbService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['']
    });

    this.fournisseurId = Number(this.route.snapshot.params['id']);
    if (this.fournisseurId) {
      this.db.getFournisseur(this.fournisseurId).then((f: Fournisseur | undefined) => {
        if (f) {
          this.fournisseurForm.patchValue({
            nom: f.nom,
            email: f.email,
            telephone: f.telephone,
            adresse: f.adresse
          });
        }
      });
    }
  }

  get fc() {
    return this.fournisseurForm.controls as {
      nom: any;
      email: any;
      telephone: any;
      adresse: any;
    };
  }

  async submit() {
    if (this.fournisseurForm.invalid) {
      this.fournisseurForm.markAllAsTouched();
      this.showToast('Veuillez corriger les erreurs.', 'error');
      return;
    }

    const data: Fournisseur = this.fournisseurForm.value;

    try {
      if (this.fournisseurId) {
        await this.db.updateFournisseur(this.fournisseurId, data);
        this.showToast('Fournisseur mis à jour avec succès !', 'success');
      } else {
        await this.db.addFournisseur(data);
        this.showToast('Fournisseur créé avec succès !', 'success');
      }

      setTimeout(() => this.router.navigate(['/app/acquisitions']), 1000);

    } catch (e) {
      this.showToast('Une erreur est survenue.', 'error');
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
      this.toastType = '';
    }, 2500);
  }

  retour() {
    window.history.back();
  }
}
