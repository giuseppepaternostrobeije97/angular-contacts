import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import {  inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ContactService } from '../contact.service';

export const contactResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  contactService: ContactService = inject(ContactService)
): Observable<{}> =>
  contactService.getContacts().pipe(
    catchError((err) => {
      return of('no data' + err);
    })
  );
