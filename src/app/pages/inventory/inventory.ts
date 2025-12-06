import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Inventory {
  name: string;
  date: string;
  responsable: string;
  status: string;
  ecarts: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {

  inventories: Inventory[] = [];
  showAddForm = false;
  
  newInventory: Inventory = {
    name: '',
    date: '',
    responsable: '',
    status: 'En cours',
    ecarts: 0
  };

  ngOnInit() {
    // Charger les inventaires existants ou données de test
    this.loadInventories();
  }

  loadInventories() {
    // Données de test - remplacez par un appel API plus tard
    this.inventories = [
      {
        name: 'Inventaire Q4 2024',
        date: '2024-12-15',
        responsable: 'Jean Dupont',
        status: 'Terminé',
        ecarts: 3
      },
      {
        name: 'Inventaire Annuel 2025',
        date: '2025-01-10',
        responsable: 'Marie Martin',
        status: 'En cours',
        ecarts: 0
      }
    ];
  }

  addInventory() {
    if (this.newInventory.name && this.newInventory.date && this.newInventory.responsable) {
      this.inventories.push({ ...this.newInventory });
      this.cancelAdd();
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newInventory = {
      name: '',
      date: '',
      responsable: '',
      status: 'En cours',
      ecarts: 0
    };
  }

  editInventory(inventory: Inventory) {
    // À implémenter : ouvrir un formulaire d'édition
    console.log('Modifier:', inventory);
    alert('Fonctionnalité de modification à venir');
  }

  deleteInventory(index: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet inventaire ?')) {
      this.inventories.splice(index, 1);
    }
  }

  viewDetails(inventory: Inventory) {
    // À implémenter : voir les détails
    console.log('Détails:', inventory);
    alert('Détails de: ' + inventory.name);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Terminé': return 'status-completed';
      case 'En cours': return 'status-progress';
      case 'Planifié': return 'status-planned';
      default: return '';
    }
  }
}