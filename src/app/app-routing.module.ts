import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { LoginGuard } from './services/login-guard.service';
import { ChatroomComponent } from './main/chatroom/chatroom.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LoginComponent } from './main/login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './main/profile/profile.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: MainComponent, children: [
    {path: 'chat', component: ChatroomComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'profile', component: ProfileComponent}
  ]},
  {path: 'login', canActivate: [LoginGuard], component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
