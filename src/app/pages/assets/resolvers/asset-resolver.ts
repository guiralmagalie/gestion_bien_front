import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DbService } from '../../../services/db.service';

@Injectable({ providedIn: 'root' })
export class AssetResolver implements Resolve<any> {
  constructor(private db: DbService, private router: Router) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    const id = Number(route.params['id']);
    if (isNaN(id)) {
      return null;
    }
    const asset = await this.db.getAsset(id);
    if (!asset) {
      this.router.navigate(['/assets']);
      return null;
    }
    return asset;
  }
}
