import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { DbService, Maintenance } from '../../services/db.service';

@Component({
  selector: 'app-maintenance',
  standalone: false,
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class MaintenanceComponent  implements OnInit {

  maintenances: Maintenance[] = [];
  assets: Asset[] = [];

  searchTerm = '';
  filterType: 'Tous' | 'Préventive' | 'Corrective' = 'Tous';

  isModalOpen = false;

  currentMaintenance: Maintenance = {
    bienId: 0,
    date: new Date().toISOString().split('T')[0],
    type: 'Corrective',
    cout: 0,
    description: ''
  };

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.maintenances = await this.db.getAllMaintenance();
    this.assets = await this.db.getAllAssets();
  }

getAssetLabel(id: any) {
  const numericId = Number(id); // 🔥 Conversion ici
  
  const asset = this.assets.find(a => a.id === numericId);
  return asset ? `${asset.libelle} (${asset.code})` : 'Bien inconnu';
}


  get filteredMaintenances() {
    return this.maintenances.filter(m => {
      const assetLabel = this.getAssetLabel(m.bienId).toLowerCase();
      const matchesSearch =
        assetLabel.includes(this.searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.filterType === 'Tous' || m.type === this.filterType;

      return matchesSearch && matchesFilter;
    });
  }

get totalCost() {
  return this.filteredMaintenances.reduce((acc, curr) => acc + Number(curr.cout), 0);
}


  openModal() {
    this.currentMaintenance = {
      bienId: 0,
      date: new Date().toISOString().split('T')[0],
      type: 'Corrective',
      cout: 0,
      description: ''
    };
    this.isModalOpen = true;
  }

  async submit() {
    if (this.currentMaintenance.id) {
      await this.db.updateMaintenance(this.currentMaintenance.id, this.currentMaintenance);
    } else {
      await this.db.addMaintenance(this.currentMaintenance);
    }
    this.isModalOpen = false;
    await this.loadData();
  }

  edit(m: Maintenance) {
    this.currentMaintenance = { ...m };
    this.isModalOpen = true;
  }
}