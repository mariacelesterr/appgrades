import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  hideElement = true;

  constructor() { }

  ngOnInit() {
  }

  onClick(){
  	this.hideElement = false;
  }

}
