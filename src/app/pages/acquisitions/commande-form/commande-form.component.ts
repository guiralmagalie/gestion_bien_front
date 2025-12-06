import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande, DbService, Fournisseur } from '../../../services/db.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {

  commandeForm!: FormGroup;
  fournisseurs: Fournisseur[] = [];
  commandeId?: number;
  isEdit = false;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  constructor(
    private db: DbService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Charger les fournisseurs
    this.fournisseurs = await this.db.getFournisseurs();

    // Formulaire strictement typé
    this.commandeForm = this.fb.group({
      dateCommande: [new Date().toISOString().split('T')[0], Validators.required],
      montantTotal: [0, [Validators.required, Validators.min(1)]],
      fournisseurId: [null, Validators.required],
      statut: ['En attente', Validators.required]
    });

    // Mode édition
    this.commandeId = Number(this.route.snapshot.params['id']);

    if (this.commandeId) {
      const c = await this.db.getCommande(this.commandeId);
      if (c) {
        this.commandeForm.patchValue({
          dateCommande: c.dateCommande,
          montantTotal: c.montantTotal,
          fournisseurId: c.fournisseurId,
          statut: c.statut
        });
        this.isEdit = true;
      }
    }
  }

  async submit() {
    if (this.commandeForm.invalid) {
      this.commandeForm.markAllAsTouched();
      this.showToast('Veuillez corriger les erreurs.', 'error');
      return;
    }

    const data: Commande = this.commandeForm.value;

    try {
      if (this.isEdit && this.commandeId) {
        await this.db.updateCommande(this.commandeId, data);
        this.showToast('Commande mise à jour avec succès !', 'success');
      } else {
        await this.db.addCommande(data);
        this.showToast('Commande créée avec succès !', 'success');
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

  get f() {
    return this.commandeForm.controls;
  }


  retour() {
    window.history.back();
  }
}
