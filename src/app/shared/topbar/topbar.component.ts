import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/** Barre supérieure réutilisée par tous les écrans du shell — titre, lien retour optionnel. */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Input() titre = '';
  @Input() retourLien: string | null = null;
  @Input() retourLabel = '';
}
