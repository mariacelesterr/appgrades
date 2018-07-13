import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import {MaterializeAction} from 'angular2-materialize';
import { Notas } from '../models/notas'
import { EstadisticasService } from '../services/estadisticas.service';
import { MorrisJsModule } from 'angular-morris-js';
import { GradosService } from '../services/grados.service';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    grado: any ;
    secciones: any;
  public promedio: any;
  public periodo: any ;
  public hideElement = true;
  public hideElement1 = true;
  public chartBarOptions: any;
  public chartBarData: any;
  public estadisticas: any = {
    id_grado: 0,
    id_seccion: 0,
    id_periodo:0
  };
  @ViewChild('f') form : any; 

  constructor( 
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private estadisticasService : EstadisticasService,
              private gradosService: GradosService,
              private seccionesService: SeccionesService) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'app-estadisticas') {
      this.estadisticasService.obtenerPeriodo()
        .subscribe(
        data =>{ 
          this.periodo = data;
          if (this.periodo.length === 0){
              alert('No hay peridos para escoger. Dirijase hasta la sección de periodo');
              this.router.navigate(['/'])}    
        },
        error => {
          alert('Hubo en error al cargar los periodos');
          console.log(error);
        });
      this.gradosService.obtenerGrados()
        .subscribe(
          data => {
            this.grado = data;
            if(this.grado.length === 0){
              alert('No hay grados para escoger. Dirijase hasta la sección de grados');
                this.router.navigate(['/'])}
            },
            error => {
            alert('Hubo en error al cargar los grados');
            console.log(error);
          })
      this.seccionesService.obtenerSecciones()
        .subscribe(data => {
          this.secciones = data;
          if(this.secciones.length === 0){
            alert('No hay secciones para escoger. Dirijase hasta la sección de secciones');
            this.router.navigate(['/'])}
        },
        error=>{
            alert('Hubo en error al cargar las secciones');
            console.log(error);
        });
    }
      this.chartBarOptions = {
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Promedio por lapso'],
        resize: true
      };
      this.chartBarData =  [];
     
    }
  doSubmit() {
    if (this.form.valid) {
      this.estadisticasService.obtenerPromedio(this.estadisticas)
      .subscribe(
        data => {
          this.promedio = data;
          if(this.promedio.length === 0)
          alert("No hay notas en este periodo, grado y sección");
          else
          this.hideElement = false; 
        },
        error => {
          alert('Ha ocurrido un error')
          this.router.navigate(['/']);
        })
    }
    else
      alert('Los datos son erroneos, Verifica e intenta de nuevo');
  }

  goBack(){
    this._location.back();
  }
  grafica(){
    this.hideElement1 = false;
      if(this.promedio.length == 3){
            this.chartBarData = [
            { x: 'Primer lapso', y: this.promedio[0].promedio},
            { x: 'Segundo lapso', y: this.promedio[1].promedio},
            { x: 'Tercer lapso', y: this.promedio[2].promedio}
          ];
        }
       else if (this.promedio.length == 2){
         this.chartBarData = [
            { x: 'Primer lapso', y: this.promedio[0].promedio},
            { x: 'Segundo lapso', y: this.promedio[1].promedio}
          ];
         }
        else if (this.promedio.length == 1){
          this.chartBarData = [
            { x: 'Primer lapso', y: this.promedio[0].promedio}
          ];
        }
        else
          alert("No hay notas en este periodo, grado y sección");
            
  }
}