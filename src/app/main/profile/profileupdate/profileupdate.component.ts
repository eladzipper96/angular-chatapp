import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { UserDataService } from 'src/app/userdata.service';

import { userPersonalData } from 'src/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { observableExtractor } from 'src/helper_functions/observables';

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
  data!: userPersonalData;
  AccountFormFeedBack: string = ''
  SocialFormFeedBack: string = ''
  PasswordFormFeedBack: string = '' 

  constructor(private UserDataService:UserDataService, private HttpClient:HttpClient) { }

  ngOnInit(): void {

    const personalData = this.UserDataService.getPersonalData()

    this.accountForm = new FormGroup({
      'name': new FormControl(observableExtractor(personalData.name)),
      'last_name': new FormControl(observableExtractor(personalData.last_name)),
      'email': new FormControl(observableExtractor(personalData.email)),
      'birthdate': new FormControl(observableExtractor(personalData.birthdate)),
      'phone': new FormControl(observableExtractor(personalData.phone)),
      'website': new FormControl(observableExtractor(personalData.website)),
      'address': new FormControl(observableExtractor(personalData.address)),
      'moto': new FormControl(observableExtractor(personalData.moto)),
      'profile_picture': new FormControl(observableExtractor(personalData.profile_picture)),
    })

    this.socialForm = new FormGroup({
      'facebook': new FormControl(observableExtractor(personalData.facebook)),
      'twitter': new FormControl(observableExtractor(personalData.twitter)),
      'instagram': new FormControl(observableExtractor(personalData.instagram)),
      'linkedin': new FormControl(observableExtractor(personalData.linkedin)),
    })

    this.passwordForm = new FormGroup({
      'current': new FormControl(null),
      'new': new FormControl(null),
      'confirm': new FormControl(null),
    })

  }

  accountFormSubmitHandler(): void {

    const accountData = {
      id: this.UserDataService.getUserId(),
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
      id: this.UserDataService.getUserId(),
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


}
