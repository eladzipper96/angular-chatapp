import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

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

  // Data
  loginProcess: boolean = false
  showOnEntrance: boolean = true

  constructor(private AuthService: AuthService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.AuthService.inLoginProcess().subscribe(value => {
      this.loginProcess = value
    })

    this.AuthService.getShowOnEntrance().subscribe(value => this.showOnEntrance = value)

  }

  ngOnDestroy(): void {
    this.loginProcessSubscription.unsubscribe()
    this.showOnEntranceSubscription.unsubscribe()
  }

}
