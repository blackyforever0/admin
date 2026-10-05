import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../../core/services/admin-api.service';
import { Revenus } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateHeureFrPipe } from '../../shared/pipes/date-heure-fr.pipe';

@Component({
  selector: 'app-revenus',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe, DateHeureFrPipe],
  templateUrl: './revenus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenusComponent implements OnInit {
  data: Revenus | null = null;

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.revenus().subscribe((d) => {
      this.data = d;
      this.cd.markForCheck();
    });
  }

  hauteurPourcent(valeurs: { total: number }[], valeur: number): number {
    const max = Math.max(1, ...valeurs.map((v) => v.total));
    return Math.max(4, Math.round((valeur / max) * 100));
  }
}
