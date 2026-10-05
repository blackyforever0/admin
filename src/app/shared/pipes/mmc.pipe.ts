import { Pipe, PipeTransform } from '@angular/core';

/** Formate un montant MMC avec espace comme séparateur de milliers : 24900 -> "24 900 MMC". */
@Pipe({ name: 'mmc', standalone: true })
export class MmcPipe implements PipeTransform {
  transform(value: number | null | undefined, avecUnite = true): string {
    if (value === null || value === undefined) return '—';
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return avecUnite ? `${formatted} MMC` : formatted;
  }
}
