import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { UserService } from '../services/user.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { EscuelaService } from '../services/escuela.service';
import swal from 'sweetalert2';

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
  datepickerset: any;
  @ViewChild('f') form: any;

  constructor(
    private _location: Location,
    private EstudiantesService: EstudiantesService,
    private escuelaService: EscuelaService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
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
    this.datepickerset = {
      format: 'dd/mm/yyyy',
      selectMonths: true,
      today: false,
      selectYears: 50,
      closeOnSelect: true,
      max: new Date(),
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
    if (this.route.snapshot.url[0].path === 'app-estudiantes') {
      if(this.form.valid){
        if (this.form.value.nombres.trim() == "")
          swal({
            title: '¡Advertencia!',
            text: 'Los nombres no pueden estar vacío',
            type: 'warning',
            confirmButtonText: 'Cerrar'
          })
        else if (this.form.value.apellidos.trim() == "")
          swal({
            title: '¡Advertencia!',
            text: 'Los apellidos no pueden estar vacío',
            type: 'warning',
            confirmButtonText: 'Cerrar'
          })
        else if (this.form.value.direccion.trim() == "")
          swal({
            title: '¡Advertencia!',
            text: 'La dirección no puede ser vacía',
            type: 'warning',
            confirmButtonText: 'Cerrar'
          })
        else{
          this.EstudiantesService.agregarEstudi(this.estudiantes)
            .subscribe(
              data => {
                swal({
                  title: 'Aprobado',
                  text: 'Se ha añadido el estudiante con exito',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
                this.router.navigate(['/app-detalles-estudiantes', data.id_estudiantes]);
              },
              error=>{
                if(error.message === 'Estudiante ya existe'){
                  swal({
                    title: '¡Error!',
                    text: error.message,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                }else{
                  swal({
                    title: '¡Error!',
                    text: 'Ha ocurrido un error intentelo de nuevo ',
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                  
                }
                console.log(error);
              }); 
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
    }
  }

}

 
