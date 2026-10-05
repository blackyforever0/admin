import { Pipe, PipeTransform } from '@angular/core';

const MOIS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

/** Formate un Instant ISO en "23 Sep 2026, 14:32" — sans dépendre d'une locale Angular enregistrée. */
@Pipe({ name: 'dateHeureFr', standalone: true })
export class DateHeureFrPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    const jour = d.getDate().toString().padStart(2, '0');
    const heures = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${jour} ${MOIS[d.getMonth()]} ${d.getFullYear()}, ${heures}:${minutes}`;
  }
}
