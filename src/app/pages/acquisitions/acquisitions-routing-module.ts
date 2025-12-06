import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeFormComponent } from './commande-form/commande-form.component';
import { FournisseurFormComponent } from './fournisseur-form/fournisseur-form.component';
import { Acquisitions } from './acquisitions';

const routes: Routes = [
  { path: '', component: Acquisitions },
  { path: 'new', component: CommandeFormComponent },
  { path: 'edit/:id', component: CommandeFormComponent },
  { path: 'supplier/new', component: FournisseurFormComponent },
  { path: 'supplier/edit/:id', component: FournisseurFormComponent },
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionsRoutingModule { }
