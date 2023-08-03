import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoRestante',
  standalone: true,
})
export class tiempoRestantePipe implements PipeTransform {
  transform(seconds: number | null): string {
    if (seconds == null) {
      return '';
    }

    const units = seconds > 1 ? 'segundos' : 'segundos';
    return `Tiempo restante: ${seconds} ${units}`;
  }
}
