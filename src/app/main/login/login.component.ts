import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/store/UserData.service';

import { user } from 'src/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  // Icons
  logo = '../../../assets/icons/logo.svg'

  //Forms
  loginForm: FormGroup = new FormGroup({
    'username': new FormControl(null,[Validators.required,Validators.minLength(4)]),
    'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
  })

  registerForm: FormGroup = new FormGroup({
    'username': new FormControl(null,[Validators.required,Validators.minLength(4)]),
    'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    'email': new FormControl(null,[Validators.required,Validators.email]),
    'full_name': new FormControl(null,[Validators.required])
  })

  // DOM
  showSpinner: boolean = false

  constructor(private HttpClient: HttpClient, private AuthService: AuthService, private UserDataService:UserDataService, private router:Router) { }

  ngOnInit(): void {
  }

  LoginSubmitHandler () {
      this.showSpinner = true

      this.HttpClient.post(`${environment.API_URL}/login`, {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }).subscribe(value => {
        const _value = value as any[]
        if(_value.length === 0) {
          alert('Wrong Username or Password')
          this.showSpinner = false
          return;
        }

        this.UserDataService.SetAllUserData(value as user[])
        this.AuthService.setIsLoggedIn(true)
        this.showSpinner = false
        this.router.navigate(['chats'])
      })
  
  }

  RegisterSubmitHandler () {
    this.HttpClient.post(`${environment.API_URL}/register`, {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      name: this.registerForm.value.full_name
    }).subscribe(res => {
      const _res = res as {status: string}
      if(_res.status === 'ok') {
        alert('Username Created Successfully')
        this.registerForm.reset()
      }
      else {
        alert('Username already taken!')
      }
    })
  }


}
