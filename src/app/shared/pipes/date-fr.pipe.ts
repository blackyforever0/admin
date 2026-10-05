import { Pipe, PipeTransform } from '@angular/core';

const MOIS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

/** Formate un Instant ISO en "23 Sep 2026" — sans dépendre de l'enregistrement d'une locale Angular. */
@Pipe({ name: 'dateFr', standalone: true })
export class DateFrPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    return `${d.getDate().toString().padStart(2, '0')} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
  }
}
