import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-boletin-descrip',
  templateUrl: './boletin-descrip.component.html',
  styleUrls: ['./boletin-descrip.component.css']
})
export class BoletinDescripComponent implements OnInit {
  maxLength = 20;
  constructor(
  	private route: ActivatedRoute, 
  	private router: Router,
  	private _location: Location) {}

  ngOnInit() {
  }

	pdf(){

		this.router.navigate(['/app-pdf']);
	}
	goBack(){
		this._location.back();
	}

}
