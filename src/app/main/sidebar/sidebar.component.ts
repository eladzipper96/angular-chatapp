import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  // Icons
  logo_src: string = '/assets/icons/logo.svg'
  chats_src: string = '/assets/icons/chats.svg'
  contacts_src: string = '/assets/icons/contacts.svg'
  settings_src: string = '/assets/icons/settings.svg'
  logout_src: string ='/assets/icons/logout.svg'

  //Subscriptions
  ShowOnEntranceSubscription: Subscription = new Subscription

  //Data
  showOnEntance: boolean = true;

  constructor(private router:Router, private AuthService:AuthService) { }

  ngOnInit(): void {
    this.ShowOnEntranceSubscription = this.AuthService.getShowOnEntrance()
    .subscribe(val => this.showOnEntance = val)
  }

  ngOnDestroy(): void {
    this.ShowOnEntranceSubscription.unsubscribe()
  }

  clickHandler(path: string) {

    if(this.showOnEntance) this.AuthService.setShowOnEntrance(false)

    this.router.navigate([path])
  }

}
