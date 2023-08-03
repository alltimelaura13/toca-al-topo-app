import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tocarTopoMessage',
  standalone: true,
})
export class tocarTopoMessagePipe implements PipeTransform {
  transform(seconds: number | null): string {
    if (seconds == null) {
      return '';
    }

    const units = seconds > 1 ? 'segundos' : 'segundos';
    return seconds > 0 ? `El juego va a comenzar en ${seconds} ${units}` : '';
  }
}
