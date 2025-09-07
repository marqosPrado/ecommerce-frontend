import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCard',
  standalone: true
})
export class MaskCard implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const clean = value.replace(/\D/g, '');
    if (clean.length < 8) return value;
    return `${clean.substring(0, 4)} **** **** ${clean.substring(clean.length - 4)}`;
  }
}
