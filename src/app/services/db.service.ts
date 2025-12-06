// src/app/services/db.service.ts
import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Asset } from '../models/asset';

export interface Fournisseur {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
}

export interface Maintenance {
  id?: number;
  bienId: number;
  date: string;
  type: 'Préventive' | 'Corrective';
  cout: number;
  description: string;
}


export interface Inventaire {
  id?: number;
  dateDebut: string;
  dateFin?: string;
  responsable: string;
  statut: 'En cours' | 'Validé' | 'Clôturé';
  ecartsIdentifies: number;
}

export interface Ecart {
  id?: number;
  inventaireId: number;       // L'inventaire auquel il appartient
  assetId?: number;           // L'asset concerné
  description: string;        // Description de l'écart
  type: 'Manquant' | 'Endommagé' | 'Autre'; // Type d’écart
  resolu?: boolean;           // Si l'écart est résolu
}

export interface Commande {
  fournisseur: any;
  id?: number;
  dateCommande: string;
  statut: 'En attente' | 'Validée' | 'Livrée';
  fournisseurId: number;
  montantTotal: number;
}

@Injectable({ providedIn: 'root' })
export class DbService extends Dexie {

  assets!: Table<Asset, number>;
  fournisseurs!: Table<Fournisseur, number>;
  commandes!: Table<Commande, number>;
  inventaires!: Table<Inventaire, number>;
  ecarts!: Table<Ecart, number>;
  maintenance!: Table<Maintenance, number>;


  constructor() {
    super('GestionBiensDB');

    this.version(2).stores({
      assets: '++id, code, libelle, etat, localisation, valeurAchat',
      fournisseurs: '++id, nom, email, telephone, adresse',
      commandes: '++id, dateCommande, statut, fournisseurId, montantTotal',
      inventaires: '++id, dateDebut, responsable, statut',
      ecarts: '++id, inventaireId, assetId, type, resolu',
      maintenance: '++id, bienId, date, type',
    });

    this.assets = this.table('assets');
    this.fournisseurs = this.table('fournisseurs');
    this.commandes = this.table('commandes');
    this.inventaires = this.table('inventaires');
    this.ecarts = this.table('ecarts');
    this.maintenance = this.table('maintenance');

  }

  /* -------------------------------------------------------
     🔢 Génération automatique du code BIEN-2025-00001
  ---------------------------------------------------------*/
  async generateNextCode(): Promise<string> {
    const currentYear = new Date().getFullYear();

    // Récupère tous les assets de l'année
    const yearPrefix = `BIEN-${currentYear}-`;

    const yearAssets = await this.assets
      .filter(a => a.code?.startsWith(yearPrefix))
      .toArray();

    let lastNumber = 0;

    if (yearAssets.length > 0) {
      const lastAsset = yearAssets.sort((a, b) => (a.code! > b.code! ? 1 : -1)).pop()!;
      lastNumber = Number(lastAsset.code?.split('-')[2]) || 0;
    }

    const nextNumber = (lastNumber + 1).toString().padStart(5, '0');

    return `${yearPrefix}${nextNumber}`;
  }

  /* ----------------------- INVENTAIRES ---------------------- */
  getAllInventaires() {
    return this.inventaires.toArray();
  }

  getInventaire(id: number) {
    return this.inventaires.get(id);
  }

  addInventaire(inv: Inventaire) {
    return this.inventaires.add(inv);
  }

  updateInventaire(id: number, changes: Partial<Inventaire>) {
    return this.inventaires.update(id, changes);
  }

  deleteInventaire(id: number) {
    return this.inventaires.delete(id);
  }

  /*------------------------ecart-------------------------*/

  getEcart(id: number) { return this.ecarts.get(id); }
  getEcartByInventaire(inventaireId: number) {
    return this.ecarts.where('inventaireId').equals(inventaireId).toArray();
  }
  addEcart(e: Ecart) { return this.ecarts.add(e); }
  updateEcart(id: number, changes: Partial<Ecart>) { return this.ecarts.update(id, changes); }
  deleteEcart(id: number) { return this.ecarts.delete(id); }

  /* ----------------------- ASSETS ---------------------- */
  async addAsset(asset: Asset) {
    asset.code = await this.generateNextCode();  // code auto
    return this.assets.add(asset);
  }
  getAllAssets() {
    return this.assets.toArray();
  }
  getAsset(id: number) {
    return this.assets.get(id);
  }
  updateAsset(id: number, changes: Partial<Asset>) {
    return this.assets.update(id, changes);
  }
  deleteAsset(id: number) {
    return this.assets.delete(id);
  }

  /* ------------------- FOURNISSEURS -------------------- */
  addFournisseur(f: Fournisseur) { return this.fournisseurs.add(f); }
  getFournisseurs() { return this.fournisseurs.toArray(); }
  getFournisseur(id: number) { return this.fournisseurs.get(id); }
  updateFournisseur(id: number, c: Partial<Fournisseur>) { return this.fournisseurs.update(id, c); }
  deleteFournisseur(id: number) { return this.fournisseurs.delete(id); }

  /* ----------------------- COMMANDES --------------------- */
  addCommande(c: Commande) { return this.commandes.add(c); }
  getCommandes() { return this.commandes.toArray(); }
  getCommande(id: number) { return this.commandes.get(id); }
  updateCommande(id: number, c: Partial<Commande>) { return this.commandes.update(id, c); }
  deleteCommande(id: number) { return this.commandes.delete(id); }

  /* ----------------------- MAINTENANCE ---------------------- */
addMaintenance(m: Maintenance) {
  return this.maintenance.add(m);
}

getAllMaintenance() {
  return this.maintenance.toArray();
}

getMaintenance(id: number) {
  return this.maintenance.get(id);
}

updateMaintenance(id: number, changes: Partial<Maintenance>) {
  return this.maintenance.update(id, changes);
}

deleteMaintenance(id: number) {
  return this.maintenance.delete(id);
}

getMaintenanceForBien(bienId: number) {
  return this.maintenance.where('bienId').equals(bienId).toArray();
}

}
