import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DocentesService } from '../services/docentes.service';
import { Docentes } from '../models/docentes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  Docentes: Docentes = new Docentes();
  userdata: any;
  constructor(
    private _location: Location,
    private DocentesService: DocentesService,
    //private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    /*if (!this.userdata) {
      this.router.navigate(['/login']);
    }*/
  }
  goBack(){
    this._location.back();
  }
  doSubmit() {
  if (this.route.snapshot.url[0].path === 'app-docentes') {
      //this.Docentes.id_user= this.userdata.id;
      this.DocentesService.crearDocente(this.Docentes)
        .subscribe(data => this.router.navigate(['/app-docentes', data.id_docentes]), error => console.log(error));
        console.log(this.Docentes);
    }
  }

}

 

