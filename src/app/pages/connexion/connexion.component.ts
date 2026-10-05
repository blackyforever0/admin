import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
})
export class ConnexionComponent {
  telephone = '';
  motDePasse = '';
  chargement = false;
  erreur: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  seConnecter(): void {
    if (!this.telephone || !this.motDePasse) {
      this.erreur = 'Renseignez votre identifiant et votre mot de passe.';
      return;
    }
    this.chargement = true;
    this.erreur = null;
    this.auth.connexion(this.telephone, this.motDePasse).subscribe({
      next: () => {
        this.chargement = false;
        this.router.navigateByUrl('/vue-ensemble');
      },
      error: (err) => {
        this.chargement = false;
        this.erreur =
          err?.error?.message ||
          (err?.message?.includes('administrateur')
            ? err.message
            : 'Identifiant ou mot de passe incorrect.');
      },
    });
  }
}
