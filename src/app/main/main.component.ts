import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DomUiService } from '../dom-ui.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // Images
  wave_image = '../../assets/images/wave.svg'
  sun_image = '../../assets/images/sun.png'
  sand_image = '../../assets/images/sand.png'

  // Subscriptions
  loginProcessSubscription: Subscription =  new Subscription
  showOnEntranceSubscription: Subscription =  new Subscription
  showAddFriendSubscription: Subscription = new Subscription
  showNotifcationsSubscription: Subscription = new Subscription

  // Data
  loginProcess: boolean = false
  showOnEntrance: boolean = true
  showAddFriend: boolean = false
  showNotifcations: boolean = false

  constructor(private AuthService: AuthService,private DomUiSerivce:DomUiService, private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.loginProcessSubscription = this.AuthService.inLoginProcess().subscribe(value => {
      this.loginProcess = value
    })

    this.showOnEntranceSubscription = this.AuthService.getShowOnEntrance().subscribe(value => this.showOnEntrance = value)
    this.showAddFriendSubscription = this.DomUiSerivce.getShowAddFriend().subscribe(value => this.showAddFriend = value)
    this.showNotifcationsSubscription = this.DomUiSerivce.getShowNotifcations().subscribe(value => this.showNotifcations = value)

  }

  ngOnDestroy(): void {
    this.loginProcessSubscription.unsubscribe()
    this.showOnEntranceSubscription.unsubscribe()
    this.showAddFriendSubscription.unsubscribe()
    this.showNotifcationsSubscription.unsubscribe()
  }

}
