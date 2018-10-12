import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import { NotasService, NotasDetalles } from '../../services/notas.service';
import { EstudiantesService } from '../../services/estudiantes.service';
import { UserService } from '../../services/user.service';
import { Estudiantes } from '../../models/estudiantes';
import { Notas } from '../../models/notas';
import swal from 'sweetalert2';

@Component({
  selector: 'boletin-descrip-detalles',
  templateUrl: './boletin-descrip-detalles.component.html',
  styleUrls: ['./boletin-descrip-detalles.component.css']
})
export class BoletinDescripDetallesComponent implements OnInit {
	maxLength = 20;
  hideElement = true;
  hideElement1 = true;
  notas: Notas = new Notas;
  notasDetalles: NotasDetalles = new NotasDetalles;
  userdata: any; 
  estudiantes: Estudiantes = new Estudiantes;
  modalActions = new EventEmitter<string|MaterializeAction>();
  vart: any;
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
    if (this.route.snapshot.url[1].path === 'boletin-descrip-detalles'){ 
      this.route.params
        .switchMap((params: Params) => 
          this.notasService.obtenerN2(params['id']))
            .subscribe(data => {
              this.notasDetalles = data;
            },
            error=>{
              swal({
                title: '¡Error!',
                text: 'Hubo un error',
                type: 'error',
                confirmButtonText: 'Aceptar'
              })
              this.router.navigate(['/app-menu']);
            });
    }
  }
    pdf(){
    this.router.navigate(['/app-pdf']);
  }
  onChange(event){
    this.vart = event;
    console.log(this.vart);
  }
  goBack(){
    this._location.back();
  }
  escuelaBasica(){
    this.hideElement =false;
    this.notasDetalles.notas.tipo_bole = 2;
  }
  escuelaInicial(){
    this.hideElement =false;
    this.notasDetalles.notas.tipo_bole = 1; 
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
    if(this.notasDetalles.notas.nota_cuali === undefined){
      swal({
        title: '¡Advertencia!',
        text: 'Debes seleccionar una opcion',
        type: 'warning',
        confirmButtonText: 'Cerrar'
      })
    }
    else{
      if (this.route.snapshot.url[1].path === 'boletin-descrip-detalles'){
        this.notasService.modificarNotas(this.notasDetalles.notas)
          .subscribe(data =>{
            swal({
                title: 'Aprobado',
                text: 'Se ha actualizado el boletin correctamente',
                type: 'success',
                confirmButtonText: 'Aceptar'
              })
            this.router.navigate(['/app-pdf/', data.id_notas_descrip])
            }, 
            error=>{
              swal({
                title: '¡Error!',
                text: 'Ha ocurrido un error al actualizar el boletin',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
              console.log(error);
          });
        this.modalActions.emit({action:"modal",params:['close']});
      }
    }  
  }

}
