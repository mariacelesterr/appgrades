import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { UserService } from '../services/user.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { GradosService } from '../services/grados.service';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiantes = new Estudiantes();
  grado: any ;
  secciones: any;
  periodo: any;

  constructor(
    private _location: Location,
    private EstudiantesService: EstudiantesService,
    private estadisticasService: EstadisticasService,
    private gradosService: GradosService,
    private seccionesService: SeccionesService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.estadisticasService.obtenerPeriodo()
      .subscribe(data => this.periodo = data)
    this.gradosService.obtenerGrados()
      .subscribe(data => this.grado = data)
    this.seccionesService.obtenerSecciones()
    .subscribe(data => this.secciones = data);
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

 
