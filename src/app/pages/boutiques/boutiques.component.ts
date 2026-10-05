import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminBoutique } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateFrPipe } from '../../shared/pipes/date-fr.pipe';

type Filtre = 'TOUTES' | 'CERTIFIEES' | 'SUSPENDUES';

@Component({
  selector: 'app-boutiques',
  standalone: true,
  imports: [CommonModule, RouterLink, TopbarComponent, MmcPipe, DateFrPipe],
  templateUrl: './boutiques.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoutiquesComponent implements OnInit {
  boutiques: AdminBoutique[] = [];
  filtre: Filtre = 'TOUTES';

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.api.boutiques().subscribe((b) => {
      this.boutiques = b;
      this.cd.markForCheck();
    });
  }

  get filtrees(): AdminBoutique[] {
    switch (this.filtre) {
      case 'CERTIFIEES':
        return this.boutiques.filter((b) => b.certifiee && !b.suspendue);
      case 'SUSPENDUES':
        return this.boutiques.filter((b) => b.suspendue);
      default:
        return this.boutiques;
    }
  }

  suspendre(b: AdminBoutique): void {
    this.api.suspendreBoutique(b.id).subscribe(() => this.charger());
  }

  reactiver(b: AdminBoutique): void {
    this.api.reactiverBoutique(b.id).subscribe(() => this.charger());
  }
}
