import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { UserService } from '../services/user.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { EscuelaService  } from '../services/escuela.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-estudiantes',
  templateUrl: './detalles.estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class DetallesEstudiantesComponent implements OnInit {
  estudiantes: Estudiantes = new Estudiantes() ;
  grado: any ;
  secciones: any;
  periodo: any;
  datepickerset: any;
  @ViewChild('f') form: any;

  constructor(
    private _location: Location,
    private EstudiantesService: EstudiantesService,
    private escuelaService: EscuelaService ,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'app-detalles-estudiantes'){
          this.route.params
            .switchMap((params: Params) => this.EstudiantesService.obtenerEstudi(params['id']))
            .subscribe(data =>{
              this.estudiantes = data;
            },
              error =>{
                  swal({
                  title: '¡Error!',
                  text: 'Hubo un error al buscar el estudiante',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                })
                this.router.navigate(['/']);
              })         
      }
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
                text: 'Hubo en error al cargar los periodos',
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
                text: 'Hubo en error al cargar los periodos',
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
                text: 'Hubo en error al cargar las secciones',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
          console.log(error);
        });
    this.datepickerset = {
      format: 'dd/mm/yyyy',
      selectMonths: true,
      today: false,
      selectYears: 50,
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
  }
  
  goBack(){
    this._location.back();
  }
  doSubmit() {
    if(this.form.valid){
      this.EstudiantesService.editEstudi(this.estudiantes)
        .subscribe(
          data => {
            swal({
                  title: 'Aprobado',
                  text: 'El estudiante se ha actulizado correctamente',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
            this.router.navigate(['/app-buscar-estudiantes']);
          },
          error=>{
            swal({
                  title: '¡Error!',
                  text: 'Ha ocurrido un error al actualizar los estudiantes ',
                  type: 'error',
                  confirmButtonText: 'Cerrar'
                })
            console.log(error);
          });
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
  borrarEstu(id: number) {
    this.route.params
      .switchMap((params: Params) => this.EstudiantesService.borrarEstudiante(params['id']))
      .subscribe(
        data =>{
          swal({
            title: 'Aprobado',
            text: 'El estudiante se ha eliminado correctamente',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/app-buscar-estudiantes']);
        },
        error => {
          console.log(error);
          swal({
            title: '¡Error!',
            text: 'Lo sentimos no se ha podido borrar el estudiante ha ocurrido un error',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
        });   
      }
}
