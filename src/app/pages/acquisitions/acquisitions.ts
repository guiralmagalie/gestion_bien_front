import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Commande, DbService, Fournisseur } from '../../services/db.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faUsers,
  faPlus,
  faPenToSquare,
  faTrash,
  faTruck,
  faCheckCircle,
  faClock,
  faXmark,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

@Pipe({ name: 'filterCommande' })
export class FilterCommandePipe implements PipeTransform {
  transform(commandes: Commande[], term: string) {
    if (!term) return commandes;
    term = term.toLowerCase();
    return commandes.filter(c =>
      c.statut.toLowerCase().includes(term) ||
      (c.fournisseurId && c.fournisseurId.toString().includes(term)) ||
      c.montantTotal.toString().includes(term) ||
      new Date(c.dateCommande).toLocaleDateString().includes(term)
    );
  }
}

@Pipe({ name: 'filterFournisseur' })
export class FilterFournisseurPipe implements PipeTransform {
  transform(fournisseurs: Fournisseur[], term: string) {
    if (!term) return fournisseurs;
    term = term.toLowerCase();
    return fournisseurs.filter(f =>
      f.nom.toLowerCase().includes(term) ||
      f.email.toLowerCase().includes(term) ||
      f.telephone.includes(term)
    );
  }
}

// Remplacer interface CommandeWithFournisseur extends Commande par :
export type CommandeWithFournisseur = Commande & { fournisseur?: Fournisseur };


@Component({
  selector: 'app-acquisitions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    FontAwesomeModule,
    FaIconComponent,
    FilterCommandePipe,
    FilterFournisseurPipe,

  ],
  templateUrl: './acquisitions.html',
  styleUrls: ['./acquisitions.css']
})

export class Acquisitions implements OnInit {

  // ✅ Icônes FontAwesome
  icons = {
    cart: faCartShopping,
    users: faUsers,
    plus: faPlus,
    edit: faPenToSquare,
    delete: faTrash,
    truck: faTruck,
    check: faCheckCircle,
    clock: faClock,
    close: faXmark,
    search: faSearch
  };

  // ✅ État des tabs
  activeTab: 'commandes' | 'fournisseurs' = 'commandes';

  // ✅ Données
  commandes: Commande[] = [];
  fournisseurs: Fournisseur[] = [];

  // ✅ Terme de recherche
  searchTerm = '';

  constructor(private db: DbService, public router: Router) { }

ngOnInit() {
 // (window as any).acq = this; // expose le composant dans la console
  this.loadData();
}


  

async loadData() {
  const commandesRaw = await this.db.getCommandes();
  const fournisseurs = await this.db.getFournisseurs();

  // Injecter directement le fournisseur
  this.commandes = commandesRaw.map(c => ({
    ...c,
    fournisseur: fournisseurs.find(f => f.id === Number(c.fournisseurId))
  }));

  this.fournisseurs = fournisseurs;

  console.log('Commandes avec fournisseurs :', this.commandes);
}








  // ❌ Supprimer une commande
  deleteCommande(id: number) {
    if (confirm('Supprimer cette commande ?')) {
      this.db.deleteCommande(id).then(() => this.loadData());
    }
  }

  getFournisseurNames(fournisseurId?: number): string {
    const f = this.fournisseurs.find(f => f.id === fournisseurId);
    return f ? f.nom : 'Inconnu';
  }


  // ❌ Supprimer un fournisseur
  deleteFournisseur(id: number) {
    if (confirm('Supprimer ce fournisseur ?')) {
      this.db.deleteFournisseur(id).then(() => this.loadData());
    }
  }

  // ✏️ Éditer une commande
  editCommande(id: number) {
    this.router.navigate(['/app/acquisitions/edit', id]);
  }

  // ✏️ Éditer un fournisseur
  editFournisseur(id: number) {
    this.router.navigate(['/app/acquisitions/supplier/edit', id]);
  }

  // ➕ Ajouter une commande
  addCommande() {
    this.router.navigate(['/app/acquisitions/new']);
  }

  // ➕ Ajouter un fournisseur
  addFournisseur() {
    this.router.navigate(['/app/acquisitions/supplier/new']);
  }

  // 🔹 Obtenir le nom du fournisseur depuis son ID
  getFournisseurName(id?: number) {
    return this.fournisseurs.find(f => f.id === id)?.nom || 'Inconnu';
  }

  // 🔹 Vérifier la classe de statut
  getStatusClass(statut: string) {
    switch (statut) {
      case 'Livrée': return 'status-livree';
      case 'Validée': return 'status-validee';
      case 'En attente': return 'status-attente';
      default: return '';
    }
  }

  goToAdd() {
  if (this.activeTab === 'commandes') {
    this.addCommande();
  } else {
    this.addFournisseur();
  }
}

}
