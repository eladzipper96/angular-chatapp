import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';

import { Subscription } from 'rxjs';
import { contact } from 'src/interfaces/contact.interface';

@Component({
  selector: 'app-contactsdetails',
  templateUrl: './contactsdetails.component.html',
  styleUrls: ['./contactsdetails.component.scss','./placeholder.component.scss']
})
export class ContactsdetailsComponent implements OnInit {

  // Icons //
  calander_icon: string = '../../../../assets/icons/calander.svg'
  phone_icon: string = '../../../../assets/icons/phone.svg'
  email_icon: string = '../../../../assets/icons/email.svg'
  house_icon: string = '../../../../assets/icons/house.svg'
  web_icon: string = '../../../../assets/icons/web.svg'
  fb_icon: string = '../../../../assets/icons/facebook.svg'
  twitter_icon: string = '../../../../assets/icons/twitter.svg'
  instagram_icon: string = '../../../../assets/icons/instagram.svg'
  linkedin_icon: string = '../../../../assets/icons/linkedin.svg'

  //Images//
  people_searching: string = '../../../../assets/images/people_searching.jpg'

  // Subscriptions //
  selectedContactSubscription: Subscription = new Subscription;

  // Data //
  showContact: boolean = false
  contactData!: contact;

  constructor(private ContactService: ContactsService) { }

  ngOnInit(): void {

    this.selectedContactSubscription = this.ContactService.getSelectedContact().subscribe(isContact => {
      if(isContact) {
        const contact = isContact as contact
        this.contactData = isContact as contact
      }
      this.showContact = !!isContact
    })
  }

  ngOnDestroy(): void {
    this.selectedContactSubscription.unsubscribe()
  }

}
