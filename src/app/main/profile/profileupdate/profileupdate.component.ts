import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { UserDataService } from 'src/app/store/UserData.service';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.scss']
})
export class ProfileupdateComponent implements OnInit {

  // Forms Control //
  accountForm!: FormGroup;
  socialForm!: FormGroup;
  passwordForm!: FormGroup;

  // Data //
  data!: any;
  AccountFormFeedBack: string = ''
  SocialFormFeedBack: string = ''
  PasswordFormFeedBack: string = '' 

  constructor(private UserDataService:UserDataService, private HttpClient:HttpClient) { }

  ngOnInit(): void {

    this.data = this.UserDataService.getPersonalDataSnapshop()

    this.accountForm = new FormGroup({
      'name': new FormControl(this.data.name),
      'last_name': new FormControl(this.data.last_name),
      'email': new FormControl(this.data.email),
      'birthdate': new FormControl(this.data.birthday),
      'phone': new FormControl(this.data.phone),
      'website': new FormControl(this.data.website),
      'address': new FormControl(this.data.address),
      'moto': new FormControl(this.data.moto),
      'profile_picture': new FormControl(this.data.profile_picture),
    })

    this.socialForm = new FormGroup({
      'facebook': new FormControl(this.data.facebook),
      'twitter': new FormControl(this.data.twitter),
      'instagram': new FormControl(this.data.instagram),
      'linkedin': new FormControl(this.data.linkedin),
    })

    this.passwordForm = new FormGroup({
      'current': new FormControl(null),
      'new': new FormControl(null),
      'confirm': new FormControl(null),
    })

  }

  accountFormSubmitHandler(): void {

    const accountData = {
      id: this.UserDataService.getUserIdSnapshot(),
      address: this.accountForm.value.address,
      name: this.accountForm.value.name,
      last_name: this.accountForm.value.last_name,
      email: this.accountForm.value.email,
      birthday: this.accountForm.value.birthdate,
      phone: this.accountForm.value.phone,
      website: this.accountForm.value.website,
      moto: this.accountForm.value.moto,
      profile_picture: this.accountForm.value.profile_picture
    }

    this.HttpClient.post(`${environment.API_URL}/account`, accountData, {responseType: 'text'})
    .subscribe(response => {
      this.AccountFormFeedBack = response
      this.UserDataService.setPersonalAccountData(accountData)
    })
  }

  socialFormSubmitHandler(): void {

    const socialData = {
      id: this.UserDataService.getUserIdSnapshot(),
      facebook: this.socialForm.value.facebook,
      twitter: this.socialForm.value.twitter,
      instagram: this.socialForm.value.instagram,
      linkedin: this.socialForm.value.linkedin
    }

    this.HttpClient.post(`${environment.API_URL}/account`, socialData, {responseType: 'text'})
    .subscribe(response => {
      this.SocialFormFeedBack = response
      this.UserDataService.setSocialAccountData(socialData)
    })

  }

  passwordFormSubmitHandler(): void {

    const passwordData = {
      id: this.UserDataService.getUserId(),
      curr: this.passwordForm.value.current,
      new: this.passwordForm.value.new,
      repeat: this.passwordForm.value.confirm
    }

    this.HttpClient.post(`${environment.API_URL}/passwordchange`, passwordData)
    .subscribe(res => {
      const _res = res as {status: string}
      this.PasswordFormFeedBack = _res.status.replace('_',' ')
    })

  }

  resetAccountForm(): void {
    this.accountForm.setValue({
      'name': this.data.name,
      'last_name': this.data.last_name,
      'email': this.data.email,
      'birthdate': this.data.birthday,
      'phone': this.data.phone,
      'website': this.data.website,
      'address': this.data.address,
      'moto': this.data.moto,
      'profile_picture': this.data.profile_picture
    })
  }

  resetSocialForm(): void {
    this.socialForm.setValue({
      'facebook': this.data.facebook,
      'twitter': this.data.twitter,
      'instagram': this.data.instagram,
      'linkedin': this.data.linkedin,
    })
  }


}
