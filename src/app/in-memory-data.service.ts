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
        id:1,
        number: 3515661999,
        name: 'cesare',
        surname: 'cremonini',
      },
      {
        id:2,
        number: 4833465968,
        name: 'Biagio',
        surname: 'Antonacci',
      },
      {
        id:3,
        number: 4480621924,
        name: 'Laura',
        surname: 'Pausini',
      },
      {
        id:4,
        number: 3803240736,
        name: 'Marco',
        surname: 'Mengoni',
      },
      {
        id:5,
        number: 8406578661,
        name: 'Charlie',
        surname: 'Charls',
      },
      {
        id:6,
        number: 8177109606,
        name: 'Tiziano',
        surname: 'Ferro',
      },
      {
        id:7,
        number: 4342859328,
        name: 'Emma',
        surname: 'Marrone',
      },
      {
        id:8,
        number: 2980067266,
        name: 'Tony',
        surname: 'Effe',
      },
      {
        id:9,
        number: 7992277119,
        name: 'Elettra',
        surname: 'Lamborghini',
      },
      {
        id:10,
        number: 5554772593,
        name: 'Gue',
        surname: 'Pequeno',
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
