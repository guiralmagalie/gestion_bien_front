import { Component, OnInit } from '@angular/core';
import { Asset, EtatBien } from '../../../models/asset';
import { DbService, Fournisseur } from '../../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Toasts simples
interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-asset-form',
  standalone: false,
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.css',
})
export class AssetForm implements OnInit {
  Object = Object;
  asset: Asset = {
    code: '',
    libelle: '',
    dateAcquisition: new Date().toISOString().split('T')[0],
    valeurAchat: 0,
    dureeAmortissement: 5,
    etat: EtatBien.NEUF,
    localisation: '',
    dateFinGarantie: '',
    fournisseurId: undefined
  };
  EtatBien = EtatBien;
  id?: number;
  loadingCode = false;


    fournisseurs: Fournisseur[] = [];

  // Toasts
  toasts: Toast[] = [];

  constructor(private db: DbService, private route: ActivatedRoute, public router: Router) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fournisseurs = await this.db.getFournisseurs();

    if (this.id) {
      const a = await this.db.getAsset(this.id);
      if (a) this.asset = a;
    } else {
      await this.generateCode();
    }
  }

  // Génération automatique du code pour nouvel asset
  async generateCode() {
    this.loadingCode = true;
    try {
      this.asset.code = await this.db.generateNextCode();
    } catch (err) {
      this.showToast('Erreur génération code', 'error');
    }
    this.loadingCode = false;
  }

  async save(form: NgForm) {
    if (!form.valid) {
      this.showToast('Veuillez corriger les erreurs du formulaire', 'error');
      return;
    }

    try {
      if (this.id) {
        await this.db.updateAsset(this.id, this.asset);
        this.showToast('Bien mis à jour avec succès', 'success');
      } else {
        await this.db.addAsset(this.asset);
        this.showToast('Bien ajouté avec succès', 'success');
        form.resetForm();
        await this.generateCode();
      }
      this.router.navigate(['/app/assets']);
    } catch (err) {
      this.showToast('Erreur lors de l\'enregistrement', 'error');
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toasts.push({ message, type });
    setTimeout(() => {
      this.toasts.shift();
    }, 40000);
  }
}
