import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import { NotasService } from '../../services/notas.service';
import { EstudiantesService } from '../../services/estudiantes.service';
import { UserService } from '../../services/user.service';
import { Estudiantes } from '../../models/estudiantes'
import { Notas } from '../../models/notas'

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
  notas1: any;
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
            this.estudiantesService.obtenerEstudi(params['id']))
              .subscribe(data => this.notas1 = data);
    }
    this.userdata = this.userService.getUserData();
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
    this.notas.tipo_bole = 2; 
      console.log(this.notas);
  }
  escuelaInicial(){
    this.hideElement =false;
    this.notas.tipo_bole = 1; 
  }
  openModal() {
    console.log(this.notas.nota_final);
    if (this.form.valid) {
    this.modalActions.emit(
      {
        action:"modal",
        params:['open']
      });
    }
    else
      alert('Los datos son erroneos, verifique e intente de nuevo');
  }
  closeModal() {
      if(this.notas.nota_cuali === undefined)
        alert('Debes seleccionar una opcion')
      else{
          if (this.route.snapshot.url[1].path === 'boletin-descrip'){
            this.notas.id_estudiantes = this.notas1[0].id_estudiantes;
            this.notas.id_grado = this.notas1[0].id_grados; 
            this.notas.id_seccion = this.notas1[0].id_seccion;
            this.notas.id_periodo = this.notas1[0].id_periodo;
            console.log(this.notas);
                      this.route.params
                      .switchMap((params: Params) => this.notasService.agregarNotas(this.notas, params['id']))
                        .subscribe(data => this.router.navigate(['/app-pdf/', data.id_notas_descrip]));
                      this.modalActions.emit({action:"modal",params:['close']});}
          }  
  }
  doSubmit() {
  }

}
