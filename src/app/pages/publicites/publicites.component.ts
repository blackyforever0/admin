import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { Publicite } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateHeureFrPipe } from '../../shared/pipes/date-heure-fr.pipe';

/**
 * File de validation des publicités (bannières) demandées par les vendeurs —
 * voir PubliciteService/AdminController.publicitesEnAttente : le vendeur paie
 * immédiatement à la demande, mais la diffusion sur l'accueil Market
 * n'apparaît qu'après validation manuelle ici.
 */
@Component({
  selector: 'app-publicites',
  standalone: true,
  imports: [CommonModule, RouterLink, TopbarComponent, MmcPipe, DateHeureFrPipe],
  templateUrl: './publicites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicitesComponent implements OnInit {
  publicites: Publicite[] = [];
  chargement = true;
  enCours = new Set<number>();

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;
    this.api.publicitesEnAttente().subscribe((p) => {
      this.publicites = p;
      this.chargement = false;
      this.cd.markForCheck();
    });
  }

  valider(id: number): void {
    this.enCours.add(id);
    this.api.validerPublicite(id).subscribe({
      next: () => this.charger(),
      error: () => {
        this.enCours.delete(id);
        this.cd.markForCheck();
      },
    });
  }

  refuser(id: number): void {
    this.enCours.add(id);
    this.api.refuserPublicite(id).subscribe({
      next: () => this.charger(),
      error: () => {
        this.enCours.delete(id);
        this.cd.markForCheck();
      },
    });
  }
}
