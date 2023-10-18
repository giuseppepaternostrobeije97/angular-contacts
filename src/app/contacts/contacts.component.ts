import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { AlertService } from '../alert.service';
import { FormGroup, FormControl, Validators, AbstractControl,ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute
  ) {}

  contacts: Contact[] = [];
  selectedContact?: Contact;
  showAdd: boolean = false;
  showRubrica: boolean = true;

  addContactForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required,Validators.minLength(2)]),
    number: new FormControl('', [Validators.pattern(/^\d{10,}$/),Validators.required]),
    birthDate: new FormControl('', [Validators.required,this.pastDateValidator]),
  });

  // check data passata
  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
  
    if (inputDate < currentDate) {
      return null; // La data è nel passato, nessun errore
    } else {
      return { pastDate: true }; // La data è nel futuro, restituisci un errore
    }
  }
  

  onSubmit() {
    console.log(this.addContactForm.value)
    this.add(this.addContactForm.value);
  }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => {
      console.log('check resolver data');
      console.log(data);  
      this.contacts = data['contactResolver'];
    })  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.alertService.add(`Contatto selezionato: ${contact.name}`);
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  add(contact: object): void {
    if (!contact) {
      return;
    }
    this.contactService.addContact(contact as Contact).subscribe((contact) => {
      this.contacts.push(contact);
      this.showAddButton();
    });
  }

  // add(name: string,surname:string,number:number,birthDate:Date): void {
  //   name = name.trim();
  //   surname = surname.trim()
  //   if (!name) { return; }
  //   this.contactService.addContact({ name,surname,number,birthDate } as Contact)
  //     .subscribe(contact => {
  //       this.contacts.push(contact);
  //       this.showAddButton();
  //     });
  // }


  delete(contact: Contact): void {
    this.contacts = this.contacts.filter((c) => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }
  initials(name: string, surname: string) {
    const initialsName = name[0];
    const initialsSurname = surname[0];
    return initialsName + initialsSurname;
  }
  showAddButton(): void {
    console.log('premuto');
    this.showAdd = !this.showAdd;
  }

  onSearchChange($event: string): void {
    this.showRubrica = !$event;
  }
}
