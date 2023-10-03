
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent implements OnInit  {

  constructor(private contactService: ContactService) {}
  contacts$!: Observable<Contact[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  

  ngOnInit(): void {
    this.contacts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.contactService.searchContacts(term)),
    );
  }

  initials(name:string,surname:string) {
    const initialsName = name[0];
    const initialsSurname = surname[0];
    return initialsName + initialsSurname
  }
}


