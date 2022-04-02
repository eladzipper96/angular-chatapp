import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailscard',
  templateUrl: './detailscard.component.html',
  styleUrls: ['./detailscard.component.scss']
})
export class DetailscardComponent implements OnInit {

  @Input() icon: string = ''
  @Input() title: string = ''
  @Input() data: string | null = ''

  constructor() { }

  ngOnInit(): void {
  }

}
