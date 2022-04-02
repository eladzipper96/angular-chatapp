import { Component, Input, OnInit } from '@angular/core';

import {chat} from '../../../interfaces/chat.interface'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()image: string = 'https://i.ibb.co/TTGJN4C/dog-2.jpg'
  @Input()name: string = 'Israel Israeli'
  @Input()content: string = 'Say Hello!'
  @Input()time: string | undefined = ''

  constructor() { }

  ngOnInit(): void {

  }

}
