import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/store/UserData.service';

import { map, Observable } from 'rxjs';
import { ContactsService } from 'src/app/main/contacts/state/contacts.service';
import { contact } from 'src/interfaces/contact.interface';

@Component({
  selector: 'app-contactslist',
  templateUrl: './contactslist.component.html',
  styleUrls: ['./contactslist.component.scss']
})
export class ContactslistComponent implements OnInit {

  // Data //
  contactList$!: Observable<contact[]>;

  constructor(private UserDataService: UserDataService, private ContactService:ContactsService) { }

  ngOnInit(): void {
    this.contactList$ = this.UserDataService.getContactsList()
  }

  selectContactHandler(contact: contact) {
    this.ContactService.setSelectedContact(contact)
  }

  updateContactList(searchParam: string): void {

    this.contactList$ = this.UserDataService.getContactsList().pipe(map((contacts) => {
      return contacts.filter(contact => `${contact.name} ${contact.last_name}`.toLowerCase().includes(searchParam))
    }))

  }

}
