import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import {MaterializeAction} from 'angular2-materialize';
import swal from 'sweetalert2';
import { Notas } from '../models/notas'
import { EstadisticasService } from '../services/estadisticas.service';
import { EscuelaService } from '../services/escuela.service';
import { MorrisJsModule } from 'angular-morris-js';

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
              private escuelaService : EscuelaService) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'app-estadisticas') {
      this.escuelaService.obtenerPeriodo()
        .subscribe(
          data =>{ 
            this.periodo = data;
            if (this.periodo.length === null){
              swal({
                    title: '¡Advertencia!',
                    text: 'No hay peridos para escoger. Dirijase hasta la sección de periodo',
                    type: 'warning',
                    confirmButtonText: 'Cerrar'
                  })
                this.router.navigate(['/app-periodo'])
            }    
          },
          error => {
            swal({
                  title: '¡Error!',
                  text: 'Hubo un error al cargar los periodos',
                  type: 'error',
                  confirmButtonText: 'Cerrar'
                })
            console.log(error);
          });
      this.escuelaService.obtenerGrados()
        .subscribe(
          data => {
            this.grado = data;
            if(this.grado.length === null){
              swal({
                    title: '¡Advertencia!',
                    text: 'No hay grados para escoger. Dirijase hasta la sección de grados',
                    type: 'warning',
                    confirmButtonText: 'Cerrar'
                  })
                this.router.navigate(['/app-grados'])
            }
          },
          error => {
            swal({
                  title: '¡Error!',
                  text: 'Hubo un error al cargar los grados',
                  type: 'error',
                  confirmButtonText: 'Cerrar'
                })
            console.log(error);
          });
      this.escuelaService.obtenerSecciones()
      .subscribe(
        data => {
          this.secciones = data;
          if(this.secciones === null){
            swal({
                title: '¡Advertencia!',
                text: 'No hay secciones para escoger. Dirijase hasta la sección de secciones',
                type: 'warning',
                confirmButtonText: 'Cerrar'
              })
          this.router.navigate(['/app-secciones'])}
        },
        error=>{
          swal({
                title: '¡Error!',
                text: 'Hubo un error al cargar las secciones',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
          console.log(error);
        });
    }
    this.chartBarOptions = {
      xkey: 'x',
      ykeys: ['y'],
      labels: ['Promedio por lapso'],
      resize: true,
      hideHover: 'auto'
    };
    this.chartBarData =  [];
     
    }
  doSubmit() {
    if (this.form.valid) {
      this.estadisticasService.obtenerPromedio(this.estadisticas)
        .subscribe(
          data => {
            this.promedio = data;
            if(this.promedio.length === 0){
              swal({
                title: '¡Advertencia!',
                text: 'No hay notas en este periodo, grado y sección',
                type: 'warning',
                confirmButtonText: 'Cerrar'
              })
              this.router.navigate(['/app-menu'])
            }
            else{
              this.hideElement = false;
            } 
          },
          error => {
            swal({
              title: '¡Error!',
              text: 'Hubo un error en cargar los promedios',
              type: 'error',
              confirmButtonText: 'Cerrar'
            })
            console.log(error);
        })
    }
    else{
      swal({
        title: '¡Error!',
        text: 'Los datos son erroneos, verifiquelos e intentelo de nuevo',
        type: 'error',
        confirmButtonText: 'Cerrar'
      })
    }   
  }

  goBack(){
    this._location.back();
  }
  grafica(){
    this.hideElement1 = false;
      if(this.promedio.length == 3){
        this.chartBarData = [
          { x: this.promedio[0].descrip, y: this.promedio[0].promedio},
          { x: this.promedio[1].descrip, y: this.promedio[1].promedio},
          { x: this.promedio[2].descrip, y: this.promedio[2].promedio}
        ];
      }
       else if (this.promedio.length == 2){
         this.chartBarData = [
            { x: this.promedio[0].descrip, y: this.promedio[0].promedio},
            { x: this.promedio[1].descrip, y: this.promedio[1].promedio}
          ];
         }
        else if (this.promedio.length == 1){
          this.chartBarData = [
            { x: this.promedio[0].descrip, y: this.promedio[0].promedio}
          ];
        }
        else{
          swal({
            title: '¡Advertencia!',
            text: 'No hay notas en este periodo, grado y sección',
            type: 'warning',
            confirmButtonText: 'Cerrar'
          })
        }
            
  }
}