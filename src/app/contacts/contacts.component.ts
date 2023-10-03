import { Component,OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit{

  constructor(private contactService: ContactService, private alertService : AlertService) {}

  contacts: Contact[] = [];
  selectedContact?: Contact;
  showAdd:boolean = false;

  ngOnInit(): void {
    this.getContacts();
  }

  onSelect(contact: Contact) : void {
    this.selectedContact = contact
    this.alertService.add(`Contatto selezionato: ${contact.name}`);
  }

  getContacts(): void {
    this.contactService.getContacts()
        .subscribe(contacts => this.contacts = contacts);
  }

  add(name: string,surname:string,number:number): void {
    name = name.trim();
    surname = surname.trim()
    if (!name) { return; }
    this.contactService.addContact({ name,surname,number } as Contact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.showAddButton();
      });  
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }
  initials(name:string,surname:string) {
    const initialsName = name[0];
    const initialsSurname = surname[0];
    return initialsName + initialsSurname
  }
  showAddButton():void {
    console.log('premuto')
    this.showAdd= !this.showAdd
  }
}
