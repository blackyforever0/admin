import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminUtilisateur } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateFrPipe } from '../../shared/pipes/date-fr.pipe';

type Filtre = 'TOUS' | 'CLIENT' | 'VENDEUR' | 'CHAUFFEUR' | 'ADMIN';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarComponent, MmcPipe, DateFrPipe],
  templateUrl: './utilisateurs.component.html',
  // OnPush : la page tableau la plus lourde (filtre + recherche recalculés
  // par un getter à chaque cycle de détection de changements) — voir le
  // commentaire détaillé dans vue-ensemble.component.ts.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: AdminUtilisateur[] = [];
  filtre: Filtre = 'TOUS';
  recherche = '';

  /** Id de l'utilisateur dont le panneau "Portefeuille" est ouvert, sinon null. */
  panneauOuvert: number | null = null;
  montantSaisi: number | null = null;
  enCours = new Set<number>();

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.api.utilisateurs().subscribe((u) => {
      this.utilisateurs = u;
      this.cd.markForCheck();
    });
  }

  get nbClients(): number {
    return this.utilisateurs.filter((u) => u.roles.includes('CLIENT')).length;
  }

  get nbVendeurs(): number {
    return this.utilisateurs.filter((u) => u.roles.includes('VENDEUR')).length;
  }

  get nbChauffeurs(): number {
    return this.utilisateurs.filter((u) => u.roles.includes('CHAUFFEUR')).length;
  }

  get filtres(): AdminUtilisateur[] {
    let liste = this.utilisateurs;
    if (this.filtre !== 'TOUS') {
      liste = liste.filter((u) => u.roles.includes(this.filtre));
    }
    const q = this.recherche.trim().toLowerCase();
    if (q) {
      liste = liste.filter(
        (u) => u.nomComplet.toLowerCase().includes(q) || u.telephone.includes(q) || (u.email ?? '').toLowerCase().includes(q),
      );
    }
    return liste;
  }

  roleLabel(role: string): string {
    switch (role) {
      case 'CLIENT':
        return 'Client';
      case 'VENDEUR':
        return 'Vendeur';
      case 'CHAUFFEUR':
        return 'Chauffeur';
      case 'ADMIN':
        return 'Admin';
      default:
        return role;
    }
  }

  roleClasse(role: string): string {
    switch (role) {
      case 'VENDEUR':
        return 'role-vendeur';
      case 'CHAUFFEUR':
        return 'role-chauffeur';
      case 'ADMIN':
        return 'role-admin';
      default:
        return 'role-client';
    }
  }

  suspendre(u: AdminUtilisateur): void {
    if (!confirm(`Suspendre le compte de ${u.nomComplet} ? Il ne pourra plus se connecter.`)) return;
    this.api.suspendreUtilisateur(u.id).subscribe(() => this.charger());
  }

  reactiver(u: AdminUtilisateur): void {
    this.api.reactiverUtilisateur(u.id).subscribe(() => this.charger());
  }

  ouvrirPanneau(u: AdminUtilisateur): void {
    this.panneauOuvert = this.panneauOuvert === u.id ? null : u.id;
    this.montantSaisi = null;
  }

  private montantValide(): number | null {
    if (!this.montantSaisi || this.montantSaisi <= 0) return null;
    return Math.round(this.montantSaisi);
  }

  actionPortefeuille(u: AdminUtilisateur, action: 'crediter' | 'debiter' | 'geler' | 'debloquer'): void {
    const m = this.montantValide();
    if (!m) return;
    this.enCours.add(u.id);
    const appel =
      action === 'crediter'
        ? this.api.rechargerPortefeuille(u.id, m)
        : action === 'debiter'
          ? this.api.debiterPortefeuille(u.id, m)
          : action === 'geler'
            ? this.api.gelerPortefeuille(u.id, m)
            : this.api.debloquerPortefeuille(u.id, m);
    appel.subscribe({
      next: () => {
        this.enCours.delete(u.id);
        this.montantSaisi = null;
        this.charger();
      },
      error: (err) => {
        this.enCours.delete(u.id);
        this.cd.markForCheck();
        alert(err?.error?.message || "L'opération a échoué.");
      },
    });
  }
}
