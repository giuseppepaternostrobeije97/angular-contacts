import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 1,
        number: '3515661999',
        name: 'cesare',
        surname: 'cremonini',
        birthDate:"2023-09-26"
      },
      {
        id: 2,
        number: '4833465968',
        name: 'Biagio',
        surname: 'Antonacci',
        birthDate:'1998-10-07'
      },
      {
        id: 3,
        number: '4480621924',
        name: 'Laura',
        surname: 'Pausini',
        birthDate:'1995-11-02'
      },
      {
        id: 4,
        number: '3803240736',
        name: 'Marco',
        surname: 'Mengoni',
        birthDate:'1987-12-09'
      },
      {
        id: 5,
        number: '8406578661',
        name: 'Charlie',
        surname: 'Charls',
        birthDate:'1999-02-24'
      },
      {
        id: 6,
        number: '8177109606',
        name: 'Tiziano',
        surname: 'Ferro',
        birthDate:'1977-05-29'
      },
      {
        id: 7,
        number: '4342859328',
        name: 'Emma',
        surname: 'Marrone',
        birthDate:'10/10/2020'
      },
      {
        id: 8,
        number: '2980067266',
        name: 'Tony',
        surname: 'Effe',
        birthDate:'10/10/2020'
      },
      {
        id: 9,
        number: '7992277119',
        name: 'Elettra',
        surname: 'Lamborghini',
        birthDate:'10/10/2020'
      },
      {
        id: 10,
        number: '5554772593',
        name: 'Gue',
        surname: 'Pequeno',
        birthDate:'10/10/2020'
      },
    ];
    return { contacts };
  }


  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 11;
  }
}
