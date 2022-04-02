import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { UserDataService } from 'src/app/userdata.service';

import { keyValuePair } from 'src/app/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  //Subscriptions
  userDataSubscription: Subscription = new Subscription

  // Data
  userdata: any;

  constructor(private UserDataService:UserDataService) { }

  ngOnInit(): void {

    const observable_list: Observable<keyValuePair | string>[] = this.UserDataService.getPersonalData()
    combineLatest(observable_list).subscribe(data => {

      let data_object: any = {}

      for(let item of data) {
        let _item = item as keyValuePair
        data_object[_item.key] = _item.value
      }

      this.userdata = data_object
    })

  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe()
  }

}
