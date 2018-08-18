import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
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
  datepickerset: any;
  @ViewChild('f') form: any;

  constructor(
    private _location: Location,
    private EstudiantesService: EstudiantesService,
    private estadisticasService: EstadisticasService,
    private gradosService: GradosService,
    private seccionesService: SeccionesService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
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
  
    this.estadisticasService.obtenerPeriodo()
      .subscribe(
        data =>{ 
          this.periodo = data;
          if (this.periodo.length === null){
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
          if(this.grado.length === null){
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
        if(this.secciones === null){
          alert('No hay secciones para escoger. Dirijase hasta la sección de secciones');
          this.router.navigate(['/'])}
      },
      error=>{
          alert('Hubo en error al cargar las secciones');
          console.log(error);
    });
  }
  
  goBack(){
    this._location.back();
  }
  doSubmit() {
    if (this.route.snapshot.url[0].path === 'app-estudiantes') {
      if(this.form.valid){
        if (this.form.value.nombres.trim() == "")
          alert("Los nombres no pueden estar vacío");
        else if (this.form.value.apellidos.trim() == "")
          alert("Los apellidos no pueden estar vacío");
        else if (this.form.value.direccion.trim() == "")
          alert("La dirección no puede ser vacía");
        else{
          this.EstudiantesService.agregarEstudi(this.estudiantes)
            .subscribe(
              data => {
                alert('Se ha añadido el estudiante con exito');
                this.router.navigate(['/app-detalles-estudiantes', data.id_estudiantes]);
              },
              error=>{
                alert('Ha ocurrido un error intentelo de nuevo');
                console.log(error);
                this.router.navigate(['/'])

              }); 
        }
      }
      else{
        alert('Los datos son erroneos, verifiquelos e intentelo de nuevo')
      }
    }
  }

}

 
