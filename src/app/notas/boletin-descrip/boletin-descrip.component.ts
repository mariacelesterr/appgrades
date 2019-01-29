import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import { NotasService } from '../../services/notas.service';
import { EstudiantesService } from '../../services/estudiantes.service';
import { UserService } from '../../services/user.service';
import { Estudiantes } from '../../models/estudiantes'
import { Notas } from '../../models/notas';
import swal from 'sweetalert2';

@Component({
  selector: 'app-boletin-descrip',
  templateUrl: './boletin-descrip.component.html',
  styleUrls: ['./boletin-descrip.component.css']
})
export class BoletinDescripComponent implements OnInit {
  maxLength = 20;
  hideElement = true;
  hideElement1 = true;
  notas: Notas = new Notas;
  notas2: any;
  userdata: any; 
  estudiantes: Estudiantes = new Estudiantes;
  modalActions = new EventEmitter<string|MaterializeAction>();
  periodo: any = {};
  vart: any;
  data : any;
  @ViewChild('f') form: any;
  constructor(
  	private route: ActivatedRoute, 
  	private router: Router,
  	private _location: Location,
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private userService: UserService
    ) {}

  ngOnInit() {

    if (this.route.snapshot.url[1].path === 'boletin-descrip'){
      this.route.params
          .switchMap((params: Params) => 
            this.notasService.obtenerEstudi(params['id']))
              .subscribe(data => {
                  this.estudiantes = data
                },
                error=>{
                  swal({
                  title: '¡Error!',
                  text: 'Hubo un error al cargar el estudiante',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                })
                this.router.navigate(['/app-menu']);
                });
    }
  }
  onChange(event){
    this.vart = event;
  }
  goBack(){
    this._location.back();
  }
  escuelaBasica(){
    this.hideElement =false;
    this.notas.tipo_bole = 2;
  }
  escuelaInicial(){
    this.hideElement =false;
    this.notas.tipo_bole = 1; 
  }
  openModal() {
    if (this.form.valid) {
      this.modalActions.emit(
        {
          action:"modal",
          params:['open']
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
  closeModal() {
    if(this.notas.nota_cuali === undefined){
      swal({
        title: '¡Advertencia!',
        text: 'Debes seleccionar una opcion',
        type: 'warning',
        confirmButtonText: 'Cerrar'
      })
    }
    else{
      if (this.route.snapshot.url[1].path === 'boletin-descrip'){
        this.notas.id_estudiantes = this.estudiantes.id_estudiantes;
        this.notasService.agregarNotas(this.notas)
          .subscribe(data => {
            swal({
                  title: 'Aprobado',
                  text: 'Se ha agregado el boletin correctamente',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
            this.router.navigate(['/app-pdf/', data.id_notas_descrip])
          },
          error=>{
            if(error.message === 'El estudiante ya tiene nota en ese lapso'){
              swal({
                title: '¡Error!',
                text: error.message,
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
            }
            else{
              swal({
                title: '¡Error!',
                text: 'Ha ocurrido un error al agregar el boletin',
                type: 'error',
                confirmButtonText: 'Cerrar'
              }) 
            }
            console.log(error);
          });
        this.modalActions.emit({action:"modal",params:['close']});
      }
    }  
  }
}
