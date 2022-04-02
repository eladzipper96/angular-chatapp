import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';

import { Subscription } from 'rxjs';
import { contact } from 'src/interfaces/contact.interface';

@Component({
  selector: 'app-contactsdetails',
  templateUrl: './contactsdetails.component.html',
  styleUrls: ['./contactsdetails.component.scss','./placeholder.component.scss']
})
export class ContactsdetailsComponent implements OnInit, OnDestroy {

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

  image: string = 'https://i.ibb.co/TTGJN4C/dog-2.jpg'
  name: string = 'Israel Israeli'
  birthdate: string = ''
  phone: string = ''
  email: string = ''
  address: string = ''
  website: string = ''
  facebook: string = ''
  twitter: string = ''
  instagram: string = ''
  linkedin: string = ''

  constructor(private ContactService: ContactsService) { }

  ngOnInit(): void {
    this.selectedContactSubscription = this.ContactService.getSelectedContact().subscribe(isContact => {
      if(isContact) {
        const contact = isContact as contact
        this.name = `${contact.name} ${contact.last_name}`
        this.image = contact.profile_picture
        this.birthdate = contact.birthday.substring(0,10)
        this.phone = contact.phone
        this.email = contact.email
        this.address = contact.address
        this.website = contact.website
        this.facebook = contact.website
        this.twitter = contact.twitter
        this.instagram = contact.instagram
        this.linkedin = contact.linkedin
      }
      this.showContact = !!isContact
    })
  }

  ngOnDestroy(): void {
    this.selectedContactSubscription.unsubscribe()
  }

}
