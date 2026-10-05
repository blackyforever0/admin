import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminCommande } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateFrPipe } from '../../shared/pipes/date-fr.pipe';

type Filtre = 'TOUTES' | 'EN_ATTENTE' | 'EN_LIVRAISON' | 'LIVREE' | 'ANNULEE' | 'LITIGES';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, RouterLink, TopbarComponent, MmcPipe, DateFrPipe],
  templateUrl: './commandes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandesComponent implements OnInit {
  commandes: AdminCommande[] = [];
  filtre: Filtre = 'TOUTES';

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.commandes().subscribe((c) => {
      this.commandes = c;
      this.cd.markForCheck();
    });
  }

  get enAttente(): number {
    return this.commandes.filter((c) => c.statut === 'EN_ATTENTE' || c.statut === 'CONFIRMEE').length;
  }

  get enLivraison(): number {
    return this.commandes.filter((c) => c.statut === 'EN_LIVRAISON').length;
  }

  get litiges(): number {
    return this.commandes.filter((c) => c.signalee).length;
  }

  get filtrees(): AdminCommande[] {
    switch (this.filtre) {
      case 'LITIGES':
        return this.commandes.filter((c) => c.signalee);
      case 'TOUTES':
        return this.commandes;
      default:
        return this.commandes.filter((c) => c.statut === this.filtre);
    }
  }
}
