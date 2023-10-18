import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HomeComponent } from './home/home.component';
import { contactResolver } from './resolver/contactResolver';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'contacts', component: ContactsComponent, resolve: {contactResolver:contactResolver} },
  { path: 'detail/:id', component: ContactDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }