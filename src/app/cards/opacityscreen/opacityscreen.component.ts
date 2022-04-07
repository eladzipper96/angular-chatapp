import { Component, Input, OnInit } from '@angular/core';
import { DomUiService } from 'src/app/services/dom-ui.service';

@Component({
  selector: 'app-opacityscreen',
  templateUrl: './opacityscreen.component.html',
  styleUrls: ['./opacityscreen.component.scss']
})
export class OpacityscreenComponent implements OnInit {

  @Input() title: string = '';
  @Input() onExit!: Function;

  exit_icon: string = '../../assets/icons/exit.svg'

  constructor(private DomUiService:DomUiService) { }

  ngOnInit(): void {
  }

  exitHandler() {
    this.onExit()
  }

}
