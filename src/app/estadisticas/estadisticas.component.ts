import { Component, OnInit, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule, Params } from '@angular/router'
import { Location } from '@angular/common';
import {MaterializeAction, MaterializeDirective} from 'angular2-materialize';
import swal from 'sweetalert2';
import { Notas } from '../models/notas'
import { EstadisticasService } from '../services/estadisticas.service';
import { EscuelaService } from '../services/escuela.service';

@Component({
  selector: 'periodos',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class periodosEstadisticas implements OnInit {
  public promedio: any;
  public promedioPeriodo: any;
  public hideElement: any = true;
  public lineChartData:Array<any> = [{ data: [], label: 'Promedio'}];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private estadisticasService : EstadisticasService,
    private escuelaService : EscuelaService) { }

  ngOnInit() {

    this.estadisticasService.obtenerPromedioPeriodo()
      .subscribe(
          data =>{ 
            this.promedioPeriodo = data;
            console.log(this.promedioPeriodo)
          for (let numero of this.promedioPeriodo ){
              this.lineChartData[0].data.push(numero.data);
              this.lineChartLabels.push(numero.label);
            }
            this.hideElement = false;
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
  }
  goBack(){
    this._location.back();
  }

  //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  /*public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];*/
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
@Component({
  selector: 'grados',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class gradosEstadisticas implements OnInit {
  
  public promedioGrados: any;
  public hideElement: any = true;

  // Pie
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private estadisticasService : EstadisticasService,
    private escuelaService : EscuelaService) { }
  
  ngOnInit() {
    this.route.params
        .switchMap((params: Params) => this.estadisticasService.obtenerPromedioGrados(params['id']))
        .subscribe(
          data => {
            this.promedioGrados= data;
            console.log(this.promedioGrados);
            for (let numero of this.promedioGrados){
              this.pieChartData.push(numero.data);
              this.pieChartLabels.push(numero.label);
            console.log(this.pieChartData);
            } 
            this.hideElement = false;

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
  goBack(){
    this._location.back();
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
@Component({
  selector: 'grados-seccion',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class grados_seccionEstadisticas implements OnInit {

 
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private estadisticasService : EstadisticasService,
    private escuelaService : EscuelaService) { }

  ngOnInit() {
   /* this.estadisticasService.obtenerPromedioPeriodo()
      .subscribe(
          data =>{ 
            this.promedioGradosSeccion = data;
            for (let numero of this.promedioGradosSeccion){
                this.barChartData.push(numero);
                console.log(this.barChartData);
              }  
            this.hideElement = false ;
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
  */
  }
  goBack(){
    this._location.back();
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public grado: any ;
  public secciones: any;
  public periodo: any ;

  public promedio: any;

  public hideElement = true;


  public estadisticas: any = {
    id_periodo:0,
    id_seccion: 0,
    id_grados: 0
  };
  public periodos: any = {
   id_periodo:0
  };
  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
       ticks: {
          min : 1,
          max : 20
        }
    }] 
    }
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [ {data: [], label: 'Promedio'}];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 

  @ViewChild('f') form : any; 

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private estadisticasService : EstadisticasService,
    private escuelaService : EscuelaService) { }

  ngOnInit() {
   // if (this.route.snapshot.url[0].path === 'app-estadisticas') {
      this.escuelaService.obtenerPeriodo()
        .subscribe(
          data =>{ 
            this.periodo = data;
            if (this.periodo.length === 0){
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
            if(this.grado.length === 0){
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
            if(this.secciones.length === 0){
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
      //}  
  }
  doSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/grados', this.periodos.id_periodo])
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
  obtenerPromedio(){
    this.estadisticasService.obtenerPromedioGradosSec(this.estadisticas)
        .subscribe(
          data =>{ 
            this.promedio = data;
            for (let numero of this.promedio){
              this.barChartLabels.push(numero.label);
              this.barChartData[0].data.push(numero.data);
            }
            this.hideElement = false;
                
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

  }
  goBack(){
    this._location.back();
  }

}

