import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';

// FontAwesome
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assets',
  standalone: false,
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets implements OnInit {
  assets: Asset[] = [];
  searchTerm = '';
  loading = true;

  // Icônes FontAwesome
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private db: DbService, public router: Router) {}

  ngOnInit() {
    this.loadAssets();
  }

  async loadAssets() {
    this.loading = true;
    this.assets = await this.db.getAllAssets();
    this.loading = false;
  }

  async deleteAsset(asset: Asset) {
    if (asset.id && confirm('Voulez-vous vraiment supprimer ce bien ?')) {
      await this.db.deleteAsset(asset.id);
      this.loadAssets();
    }
  }

  filteredAssets() {
    const term = this.searchTerm.toLowerCase().trim();

    return this.assets
      .filter(a => a && a.libelle && a.code) // protection contre undefined
      .filter(a =>
        a.libelle.toLowerCase().includes(term) ||
        a.code.toLowerCase().includes(term)
      );
  }
}
