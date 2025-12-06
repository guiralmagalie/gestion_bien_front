import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService, Fournisseur } from '../../../services/db.service';
import { Asset } from '../../../models/asset';
import { faMapMarkerAlt, faMoneyBillWave, faCalendarDays, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asset-detail',
  standalone: false,
  templateUrl: './asset-detail.html',
  styleUrl: './asset-detail.css',
})
export class AssetDetail implements OnInit {
  asset: Asset | null | undefined = null;
  id?: number;

  // FontAwesome Icons
  faLocation = faMapMarkerAlt;
  faMoney = faMoneyBillWave;
  faCalendar = faCalendarDays;
  faEdit = faPen;
  faDelete = faTrash;

  constructor(private db: DbService, private route: ActivatedRoute, public router: Router) {}


 async ngOnInit() {
  // Récupération de l'id depuis la route
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  if (this.id) {
    // Récupération de l'asset
    const assetFound = await this.db.getAsset(this.id);
    if (assetFound) {
      this.asset = assetFound;

      // Vérifier si l'asset a un fournisseur
      if (this.asset.fournisseurId != null) {
        const fournisseurIdNumber = Number(this.asset.fournisseurId);
        // Ajouter le fournisseur à l'asset pour l'affichage
        (this.asset as any).fournisseur = await this.db.getFournisseur(fournisseurIdNumber);
      }
    }
  }
}





  back() {
    this.router.navigate(['/app/assets']);
  }

  async deleteAsset() {
    if (this.asset?.id && confirm('Voulez-vous vraiment supprimer ce bien ?')) {
      await this.db.deleteAsset(this.asset.id);
      this.back();
    }
  }

  calculateCurrentValue(asset: Asset): number {
    const diffYears =
      (new Date().getTime() - new Date(asset.dateAcquisition).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (diffYears >= asset.dureeAmortissement) return 0;
    const depreciation = asset.valeurAchat / asset.dureeAmortissement;
    return Math.max(0, Math.round(asset.valeurAchat - depreciation * diffYears));
  }
}
