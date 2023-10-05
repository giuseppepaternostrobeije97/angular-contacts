import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (!value) {
      return '';
    }

    let formattedValue = value.trim().replace(/^\+/, '');
    const formattedNumber = [];
    
    const lastFourDigits = formattedValue.slice(-4); // Prendi le ultime 4 cifre
    const firstDigits = formattedValue.slice(0, -4); // Prendi le cifre restanti
    
    for (let i = 0; i < firstDigits.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedNumber.push(' '); // Aggiungi uno spazio ogni 3 cifre nelle prime cifre
      }
      formattedNumber.push(firstDigits.charAt(i));
    }

    // Aggiungi le ultime 4 cifre senza spazi intermedi
    formattedNumber.push(' ');
    formattedNumber.push(lastFourDigits);
    
    return formattedNumber.join('');
  }
}
