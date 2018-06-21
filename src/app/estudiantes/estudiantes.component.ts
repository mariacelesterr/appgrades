import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { UserService } from '../services/user.service';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiantes = new Estudiantes();
  grados: any ;
  seccion: any;

  constructor(
    private _location: Location,
    private EstudiantesService: EstudiantesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
  }
  
  goBack(){
    this._location.back();
  }
  doSubmit() {
  if (this.route.snapshot.url[0].path === 'app-estudiantes') {
      this.EstudiantesService.agregarEstudi(this.estudiantes)
        .subscribe(data => this.router.navigate(['/app-estudiantes', data.id_estudiantes]));
        console.log(this.estudiantes);
    }
  }

}

 
