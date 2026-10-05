import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';
import { AdminBoutiqueDetail } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';
import { DateFrPipe } from '../../shared/pipes/date-fr.pipe';

@Component({
  selector: 'app-fiche-boutique',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe, DateFrPipe],
  templateUrl: './fiche-boutique.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FicheBoutiqueComponent implements OnInit {
  boutique: AdminBoutiqueDetail | null = null;
  private id!: number;

  constructor(private api: AdminApiService, private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.charger();
  }

  charger(): void {
    this.api.boutiqueDetail(this.id).subscribe((b) => {
      this.boutique = b;
      this.cd.markForCheck();
    });
  }

  suspendre(): void {
    this.api.suspendreBoutique(this.id).subscribe(() => this.charger());
  }

  reactiver(): void {
    this.api.reactiverBoutique(this.id).subscribe(() => this.charger());
  }

  certifier(): void {
    this.api.certifierBoutique(this.id).subscribe(() => this.charger());
  }

  decertifier(): void {
    this.api.decertifierBoutique(this.id).subscribe(() => this.charger());
  }

  activerProduit(produitId: number): void {
    this.api.activerProduit(produitId).subscribe(() => this.charger());
  }

  desactiverProduit(produitId: number): void {
    this.api.desactiverProduit(produitId).subscribe(() => this.charger());
  }
}
