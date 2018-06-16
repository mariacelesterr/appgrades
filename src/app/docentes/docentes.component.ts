import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  constructor(
  	private _location: Location) { }

  ngOnInit() {
  }
  goBack(){
		this._location.back();
	}

}
