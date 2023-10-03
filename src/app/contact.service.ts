import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './contact';
import { CONTACTS } from './mock_contacts';
import { AlertService } from './alert.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = 'api/contacts'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private alertService: AlertService,private http: HttpClient,) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap((_) => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContact', []))
    );
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched Contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  private log(alert: string) {
    this.alertService.add(`alertService: ${alert}`);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('update contact'))
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((newContact: Contact) => this.log(`added contact w/ id=${newContact.id}`)),
      catchError(this.handleError<Contact>('add contact'))
    );
  }

  deleteContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
  
    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('delete contact'))
    );
  }
  
  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      // if not search term, return empty Contact array.
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Contactes matching "${term}"`)
          : this.log(`no Contactes matching "${term}"`)
      ),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }
}
