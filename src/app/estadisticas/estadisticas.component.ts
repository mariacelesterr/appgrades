import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import {MaterializeAction} from 'angular2-materialize';
import { Notas } from '../models/notas'
import { EstadisticasService } from '../services/estadisticas.service';
import { MorrisJsModule } from 'angular-morris-js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
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

  constructor( private estadisticasService: EstadisticasService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'app-estadisticas') {
      this.estadisticasService.obtenerPeriodo()
      .subscribe(data => this.periodo = data)
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
    this.hideElement = false;
    this.estadisticasService.obtenerPromedio(this.estadisticas)
      .subscribe(data => {this.promedio = data })
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