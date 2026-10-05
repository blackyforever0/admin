import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../../core/services/admin-api.service';
import { VueEnsemble } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';

@Component({
  selector: 'app-vue-ensemble',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe],
  templateUrl: './vue-ensemble.component.html',
  // OnPush : sans ça, Angular recalcule TOUT (getters, appels de fonctions
  // dans le template comme hauteurPourcent) à chaque cycle de détection de
  // changements — déclenché par n'importe quel événement de l'app entière
  // (frappe clavier ailleurs, timer, etc.), pas seulement par un changement
  // utile à cette page. C'est la cause de la lenteur ressentie sur les pages
  // à tableaux/graphiques. Avec OnPush, cette page n'est revérifiée que
  // lorsqu'un événement lui appartient, ou qu'on appelle markForCheck()
  // explicitement (fait ci-dessous après chaque réponse HTTP).
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueEnsembleComponent implements OnInit {
  data: VueEnsemble | null = null;

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.vueEnsemble().subscribe((d) => {
      this.data = d;
      this.cd.markForCheck();
    });
  }

  /**
   * Hauteur relative de la barre la plus haute d'une série — sert de
   * dénominateur au graphique. Le max est recalculé pour chaque barre
   * (appelé 2x par barre dans le template) ; avec OnPush ce n'est plus
   * exécuté en boucle à chaque frappe/timer ailleurs dans l'app, seulement
   * quand cette page est effectivement redessinée.
   */
  hauteurPourcent(valeurs: { total: number }[], valeur: number): number {
    const max = Math.max(1, ...valeurs.map((v) => v.total));
    return Math.max(4, Math.round((valeur / max) * 100));
  }
}
