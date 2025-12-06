import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../../../models/asset';
import { DbService } from '../../../services/db.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-assets-list',
  templateUrl: './asset-list.html',
  imports: [FormsModule]
})
export class AssetList implements OnInit {
  assets: Asset[] = [];
  searchTerm = '';

  constructor(private db: DbService, private router: Router) { }

  ngOnInit() {
    this.loadAssets();
  }

  async loadAssets() {
    this.assets = await this.db.getAllAssets();
  }

  async deleteAsset(asset: Asset) {
    if (asset.id && confirm('Voulez-vous vraiment supprimer ce bien ?')) {
      await this.db.deleteAsset(asset.id);
      this.loadAssets();
    }
  }

  filteredAssets() {
    return this.assets.filter(a =>
      a.libelle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
