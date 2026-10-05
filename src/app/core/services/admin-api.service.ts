import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AdminUtilisateur,
  AdminBoutique,
  AdminBoutiqueDetail,
  AdminChauffeurDetail,
  AdminCommande,
  AdminCommandeDetail,
  ActionLitige,
  MotoTaxis,
  Publicite,
  Revenus,
  VueEnsemble,
} from '../models/admin.models';

/** Un seul point d'entrée HTTP vers /api/admin/** — miroir d'AdminController.java. */
@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly base = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) {}

  vueEnsemble(): Observable<VueEnsemble> {
    return this.http.get<VueEnsemble>(`${this.base}/vue-ensemble`);
  }

  utilisateurs(): Observable<AdminUtilisateur[]> {
    return this.http.get<AdminUtilisateur[]>(`${this.base}/utilisateurs`);
  }

  rechargerPortefeuille(utilisateurId: number, montantMmc: number): Observable<void> {
    return this.http.post<void>(`${this.base}/portefeuilles/${utilisateurId}/recharger`, { montantMmc });
  }

  suspendreUtilisateur(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/utilisateurs/${id}/suspendre`, {});
  }

  reactiverUtilisateur(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/utilisateurs/${id}/reactiver`, {});
  }

  debiterPortefeuille(utilisateurId: number, montantMmc: number): Observable<void> {
    return this.http.post<void>(`${this.base}/portefeuilles/${utilisateurId}/debiter`, { montantMmc });
  }

  gelerPortefeuille(utilisateurId: number, montantMmc: number): Observable<void> {
    return this.http.post<void>(`${this.base}/portefeuilles/${utilisateurId}/geler`, { montantMmc });
  }

  debloquerPortefeuille(utilisateurId: number, montantMmc: number): Observable<void> {
    return this.http.post<void>(`${this.base}/portefeuilles/${utilisateurId}/debloquer`, { montantMmc });
  }

  boutiques(): Observable<AdminBoutique[]> {
    return this.http.get<AdminBoutique[]>(`${this.base}/boutiques`);
  }

  boutiqueDetail(id: number): Observable<AdminBoutiqueDetail> {
    return this.http.get<AdminBoutiqueDetail>(`${this.base}/boutiques/${id}`);
  }

  suspendreBoutique(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/boutiques/${id}/suspendre`, {});
  }

  reactiverBoutique(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/boutiques/${id}/reactiver`, {});
  }

  certifierBoutique(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/boutiques/${id}/certifier`, {});
  }

  decertifierBoutique(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/boutiques/${id}/decertifier`, {});
  }

  activerProduit(produitId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/produits/${produitId}/activer`, {});
  }

  desactiverProduit(produitId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/produits/${produitId}/desactiver`, {});
  }

  commandes(): Observable<AdminCommande[]> {
    return this.http.get<AdminCommande[]>(`${this.base}/commandes`);
  }

  commandeDetail(id: number): Observable<AdminCommandeDetail> {
    return this.http.get<AdminCommandeDetail>(`${this.base}/commandes/${id}`);
  }

  resoudreLitige(id: number, action: ActionLitige): Observable<void> {
    return this.http.post<void>(`${this.base}/commandes/${id}/resoudre-litige`, { action });
  }

  motoTaxis(): Observable<MotoTaxis> {
    return this.http.get<MotoTaxis>(`${this.base}/mototaxis`);
  }

  chauffeurDetail(id: number): Observable<AdminChauffeurDetail> {
    return this.http.get<AdminChauffeurDetail>(`${this.base}/mototaxis/chauffeurs/${id}`);
  }

  suspendreChauffeur(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/mototaxis/chauffeurs/${id}/suspendre`, {});
  }

  reactiverChauffeur(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/mototaxis/chauffeurs/${id}/reactiver`, {});
  }

  revenus(): Observable<Revenus> {
    return this.http.get<Revenus>(`${this.base}/revenus`);
  }

  publicitesEnAttente(): Observable<Publicite[]> {
    return this.http.get<Publicite[]>(`${this.base}/publicites`);
  }

  validerPublicite(id: number): Observable<Publicite> {
    return this.http.post<Publicite>(`${this.base}/publicites/${id}/valider`, {});
  }

  refuserPublicite(id: number): Observable<Publicite> {
    return this.http.post<Publicite>(`${this.base}/publicites/${id}/refuser`, {});
  }
}
