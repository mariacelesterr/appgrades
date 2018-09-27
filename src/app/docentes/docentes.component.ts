import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, ActivatedRoute } from '@angular/router';
import { DocentesService } from '../services/docentes.service';
import { Docentes } from '../models/docentes';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  Docentes: Docentes = new Docentes();
  userdata: any;
  datepickerset : any;
  @ViewChild('f') form: any;
  constructor(
    private _location: Location,
    private DocentesService: DocentesService,
    //private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    /*if (!this.userdata) {
      this.router.navigate(['/login']);
    }*/
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
    if (this.form.valid) {
      if (this.route.snapshot.url[0].path === 'app-docentes') {
        this.DocentesService.crearDocente(this.Docentes)
          .subscribe(
            data => {
              swal({
                  title: 'Aprobado',
                  text: 'Se ha añadido el docente con exito',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
              this.router.navigate(['/app-docentes', data.id_docentes])}, 
            error => {
              swal({
                title: '¡Error!',
                text: 'Ha ocurrido un error intentelo de nuevo ',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
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