import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { MotoTaxis } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateHeureFrPipe } from '../../shared/pipes/date-heure-fr.pipe';

type Filtre = 'TOUS' | 'DISPONIBLES' | 'HORS_LIGNE' | 'SUSPENDUS';

@Component({
  selector: 'app-mototaxis',
  standalone: true,
  imports: [CommonModule, RouterLink, TopbarComponent, MmcPipe, DateHeureFrPipe],
  templateUrl: './mototaxis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotoTaxisComponent implements OnInit {
  data: MotoTaxis | null = null;
  filtre: Filtre = 'TOUS';

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.api.motoTaxis().subscribe((d) => {
      this.data = d;
      this.cd.markForCheck();
    });
  }

  get chauffeursFiltres() {
    if (!this.data) return [];
    switch (this.filtre) {
      case 'DISPONIBLES':
        return this.data.chauffeurs.filter((c) => c.disponible && !c.suspendu);
      case 'HORS_LIGNE':
        return this.data.chauffeurs.filter((c) => !c.disponible && !c.suspendu);
      case 'SUSPENDUS':
        return this.data.chauffeurs.filter((c) => c.suspendu);
      default:
        return this.data.chauffeurs;
    }
  }

  vehiculeClasse(type: string): string {
    return type.toLowerCase();
  }

  suspendre(id: number): void {
    this.api.suspendreChauffeur(id).subscribe(() => this.charger());
  }

  reactiver(id: number): void {
    this.api.reactiverChauffeur(id).subscribe(() => this.charger());
  }
}
