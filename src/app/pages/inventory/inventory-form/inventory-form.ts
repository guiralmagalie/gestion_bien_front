import { Component, OnInit } from '@angular/core';
import { DbService, Inventaire, Ecart } from '../../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory-form.html',
  styleUrls: ['./inventory-form.css']
})
export class InventoryForm implements OnInit {
  inventaire: Inventaire = {
    dateDebut: new Date().toISOString().split('T')[0],
    responsable: 'Utilisateur Courant',
    statut: 'En cours',
    ecartsIdentifies: 0
  };
  ecarts: Ecart[] = [];
  id?: number;

  constructor(private db: DbService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      const inv = await this.db.getInventaire(this.id);
      if (inv) this.inventaire = inv;

      // Charger les écarts existants
      this.ecarts = await this.db.getEcartByInventaire(this.id);
    }
  }

  /**
   * Ajoute un nouvel écart
   * @param description description de l'écart
   * @param type type d'écart : 'Manquant' | 'Endommagé' | 'Autre'
   * @param assetId optionnel, l'asset lié
   */
  async addEcart(description: string, type: string, assetId?: number) {
    if (!this.id) return;

    // ⚡ cast de type string vers type spécifique
    const typedType = type as 'Manquant' | 'Endommagé' | 'Autre';

    const newEcart: Ecart = {
      inventaireId: this.id,
      description,
      type: typedType,
      assetId,
      resolu: false
    };

    await this.db.addEcart(newEcart);
    this.ecarts = await this.db.getEcartByInventaire(this.id);
    this.updateEcartCount();
  }

  async updateEcartCount() {
    this.inventaire.ecartsIdentifies = this.ecarts.length;
    if (this.id) {
      await this.db.updateInventaire(this.id, { ecartsIdentifies: this.ecarts.length });
    }
  }

  async saveInventaire() {
    if (this.id) {
      await this.db.updateInventaire(this.id, this.inventaire);
    } else {
      const newId = await this.db.addInventaire(this.inventaire);
      this.id = Number(newId);
    }
    this.router.navigate(['/inventory']);
  }
}