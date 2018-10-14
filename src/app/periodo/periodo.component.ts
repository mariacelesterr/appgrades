import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { EscuelaService } from '../services/escuela.service';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
 	public periodos1: any ={
    descrip_peri: '',
    id_periodo: null
  };
  periodo: any ;
 	datepickerset : any;
  final: any;
  inicio: any;
  @ViewChild('f') form: any;

  constructor(private escuelaService: EscuelaService,
              private _location: Location,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   	this.datepickerset = {
        format: 'dd/mm/yyyy',
        selectMonths: true,
        today: false,
        selectYears: 10,
        closeOnSelect: true,
        //max: new Date(),
        //disable: [true],
        clear: 'Cerrar',
        close: 'Guardar',
        buttonImageOnly: false,
        formatSubmit: "yyyy",
        monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
        monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
        weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
        weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      }
    this.escuelaService.obtenerPeriodo()
      .subscribe(data => {
          this.periodo = data
        },
        error=>{
          swal({
              title: '¡Error!',
              text: 'Hubo un error al cargar los periodos',
              type: 'error',
              confirmButtonText: 'Cerrar'
            })
            console.log(error);
      });
  }
  doSubmit() {
    var separador = "/";
    var per1= this.inicio.split(separador);
    var per2 = this.final.split(separador);
    var result = [];
    if (this.form.valid) {
      if(per1[2]===per2[2])
        swal({
          title: '¡Advertencia!',
          text: "No pueden cuincidir los años",
          type: 'warning',
          confirmButtonText: 'Cerrar'
        })
      else if(per1[2]>per2[2])
        swal({
          title: '¡Advertencia!',
          text: 'Periodo no permitido',
          type: 'warning',
          confirmButtonText: 'Cerrar'
        })
      else{
          this.periodos1.descrip_peri = per1[2] + "-" + per2[2];
          this.periodo.forEach(function(element) {
            for (const prop in element) {
              result.push(element[prop]);}
            });
          var existe = result.includes(this.periodos1.descrip_peri) // true
          if(existe === true )
            swal({
              title: '¡Advertencia!',
              text: 'Este periodo ya existe',
              type: 'warning',
              confirmButtonText: 'Cerrar'
            })
          else{
            this.escuelaService.agregarPeriodo(this.periodos1)
              .subscribe( data => {
                swal({
                  title: 'Aprobado',
                  text: 'Se ha añadido el periodo satisfactoriamente',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
                this.router.navigate(['/app-periodo'])
                },
                error =>{
                  swal({
                    title: '¡Error!',
                    text: 'Ha ocurrido un error intentelo de nuevo',
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                  console.log(error);
                  this.router.navigate(['/app-menu'])
                })
          }   
      }
    }
    else{
      swal({
        title: '¡Error!',
        text: 'Los datos son erroneos, verifiquelos e intentelo de nuevo',
        type: 'error',
        confirmButtonText: 'Cerrar'
      })
    }
    this.form.reset();
  }
  borrarPer(id: number) {
    if (this.route.snapshot.url[0].path === 'app-periodo') {
      this.escuelaService.borrarPeriodo(id)
        .subscribe(data => {
            swal({
            title: 'Aprobado',
            text: 'Se ha borrado con exito el periodo',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/app-menu']);
          },
          error => {
            swal({
              title: '¡Error!',
              text: 'No se pudo borrar el periodo, ha ocurrido un error',
              type: 'error',
              confirmButtonText: 'Cerrar'
            })
            console.log(error);
          });
    }
  }
  goBack(){
    this._location.back();
  }
}
