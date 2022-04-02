import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss']
})
export class ProfiledetailsComponent implements OnInit {

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

    // Data //
    profileImage: string = 'https://i.ibb.co/TTGJN4C/dog-2.jpg'
    name: string = 'Israel Israeli'
    @Input() data: any;

  constructor() { }

  ngOnInit(): void {


  }

}
