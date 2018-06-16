import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  constructor(
  	private _location: Location) { }

  ngOnInit() {
  }
  goBack(){
		this._location.back();
	}

}
