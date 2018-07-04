import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { NotasService } from '../services/notas.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { GradosService } from '../services/grados.service';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  hideElement = true;
  estudiantes: Estudiantes = new Estudiantes();
  grado: any ;
  secciones: any;
  periodo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private estadisticasService : EstadisticasService,
    private gradosService: GradosService,
     private seccionesService: SeccionesService) {}

  ngOnInit() {
    this.estadisticasService.obtenerPeriodo()
      .subscribe(data => this.periodo = data)
    this.gradosService.obtenerGrados()
      .subscribe(data => this.grado = data)
    this.seccionesService.obtenerSecciones()
    .subscribe(data => this.secciones = data);
  }

  onClick(){
  }
  doSubmit() {
  	this.hideElement = false;
    this.notasService.buscarEstudiante(this.estudiantes)
      .subscribe(data => this.estudiantes = data);
      console.log(this.estudiantes);
  }
  

}
