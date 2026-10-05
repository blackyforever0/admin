import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { ShellComponent } from './shell/shell.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { VueEnsembleComponent } from './pages/vue-ensemble/vue-ensemble.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { BoutiquesComponent } from './pages/boutiques/boutiques.component';
import { FicheBoutiqueComponent } from './pages/fiche-boutique/fiche-boutique.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { DetailCommandeComponent } from './pages/detail-commande/detail-commande.component';
import { MotoTaxisComponent } from './pages/mototaxis/mototaxis.component';
import { FicheChauffeurComponent } from './pages/fiche-chauffeur/fiche-chauffeur.component';
import { RevenusComponent } from './pages/revenus/revenus.component';
import { PublicitesComponent } from './pages/publicites/publicites.component';

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'vue-ensemble', component: VueEnsembleComponent },
      { path: 'utilisateurs', component: UtilisateursComponent },
      { path: 'boutiques', component: BoutiquesComponent },
      { path: 'boutiques/:id', component: FicheBoutiqueComponent },
      { path: 'publicites', component: PublicitesComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'commandes/:id', component: DetailCommandeComponent },
      { path: 'mototaxis', component: MotoTaxisComponent },
      { path: 'mototaxis/:id', component: FicheChauffeurComponent },
      { path: 'revenus', component: RevenusComponent },
      { path: '', pathMatch: 'full', redirectTo: 'vue-ensemble' },
    ],
  },
  { path: '**', redirectTo: 'vue-ensemble' },
];
