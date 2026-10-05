import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminCommandeDetail } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateHeureFrPipe } from '../../shared/pipes/date-heure-fr.pipe';

@Component({
  selector: 'app-detail-commande',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe, DateHeureFrPipe],
  templateUrl: './detail-commande.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCommandeComponent implements OnInit {
  commande: AdminCommandeDetail | null = null;
  enCours = false;
  private id!: number;

  constructor(private api: AdminApiService, private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.charger();
  }

  charger(): void {
    this.api.commandeDetail(this.id).subscribe((c) => {
      this.commande = c;
      this.cd.markForCheck();
    });
  }

  get signalementOuvert() {
    return this.commande?.signalements.find((s) => s.statut === 'OUVERT') ?? null;
  }

  confirmer(): void {
    this.agir('CONFIRMER');
  }

  regenererCode(): void {
    this.agir('REGENERER_CODE');
  }

  rembourser(): void {
    this.agir('REMBOURSER');
  }

  private agir(action: 'CONFIRMER' | 'REGENERER_CODE' | 'REMBOURSER'): void {
    if (this.enCours) return;
    this.enCours = true;
    this.api.resoudreLitige(this.id, action).subscribe({
      next: () => {
        this.enCours = false;
        this.charger();
      },
      error: () => {
        this.enCours = false;
        this.cd.markForCheck();
      },
    });
  }
}
