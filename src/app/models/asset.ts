import { Fournisseur } from "../services/db.service";

export enum EtatBien {
  NEUF = 'Neuf',
  BON = 'Bon',
  USAGE = 'Usagé',
  EN_PANNE = 'En panne',
  DECLASSE = 'Déclassé'
}

export interface Asset {
  id?: number;
  code: string;
  libelle: string;
  dateAcquisition: string;
  valeurAchat: number;
  dureeAmortissement: number;
  etat: EtatBien;
  localisation: string;
  dateFinGarantie?: string;
  fournisseurId?: number;

   fournisseur?: Fournisseur;
}
