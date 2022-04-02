import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter()
  searchValue: string = ''

  options_icon = '../../../assets/icons/options.svg'
  notifcations_icon = '../../../assets/icons/notifcations.svg'
  addfriend_icon = '../../../assets/icons/add_friend.svg'
  search_icon = '../../../assets/icons/search.svg'

  constructor() { }

  ngOnInit(): void {
  }

  emitSearchValue(new_value: string) {
    this.searchValue = new_value
    this.searchEvent.emit(new_value)
  }

}
