import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminChauffeurDetail } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateFrPipe } from '../../shared/pipes/date-fr.pipe';
import { DateHeureFrPipe } from '../../shared/pipes/date-heure-fr.pipe';

@Component({
  selector: 'app-fiche-chauffeur',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe, DateFrPipe, DateHeureFrPipe],
  templateUrl: './fiche-chauffeur.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FicheChauffeurComponent implements OnInit {
  chauffeur: AdminChauffeurDetail | null = null;
  private id!: number;

  constructor(private api: AdminApiService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.charger();
  }

  charger(): void {
    this.api.chauffeurDetail(this.id).subscribe((c) => {
      this.chauffeur = c;
      this.cd.markForCheck();
    });
  }

  suspendre(): void {
    this.api.suspendreChauffeur(this.id).subscribe(() => this.charger());
  }

  reactiver(): void {
    this.api.reactiverChauffeur(this.id).subscribe(() => this.charger());
  }
}
