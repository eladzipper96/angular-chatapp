import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDataService } from 'src/app/store/UserData.service';

import { Subscription } from 'rxjs';
import { ContactsService } from 'src/app/main/contacts/state/contacts.service';
import { contact } from 'src/interfaces/contact.interface';

@Component({
  selector: 'app-contactslist',
  templateUrl: './contactslist.component.html',
  styleUrls: ['./contactslist.component.scss']
})
export class ContactslistComponent implements OnInit, OnDestroy {

  // Data //
  fullContactList!: contact[];
  contactList!: contact[];

  // Subscription //
  contactListSubscription: Subscription = new Subscription

  constructor(private UserDataService: UserDataService, private ContactService:ContactsService) { }

  ngOnInit(): void {
    this.contactListSubscription = this.UserDataService.getContactsList()
    .subscribe(val => {
      this.contactList = val
      this.fullContactList = val
    })
  }

  selectContactHandler(contact: contact) {
    this.ContactService.setSelectedContact(contact)
  }

  ngOnDestroy(): void {
    this.contactListSubscription.unsubscribe()
  }

  updateContactList(searchParam: string): void {
    const new_list: contact[] = []
    
    this.fullContactList.forEach((contact: contact) => {
      let full_name = `${contact.name} ${contact.last_name}`.toLowerCase()
      if(full_name.includes(searchParam.toLowerCase())) {
        new_list.push(contact)
      }
    })

    this.contactList = new_list

  }

}
