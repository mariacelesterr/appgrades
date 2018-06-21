import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotasService } from '../../services/notas.service';
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
  notas: Notas = new Notas; 
  userdata: any; 
  estudiantes: Estudiantes = new Estudiantes;
  constructor(
  	private route: ActivatedRoute, 
  	private router: Router,
  	private _location: Location,
    private notasService: NotasService,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.notasService.obtenerEstudi(params['id']))
      .subscribe(data => this.estudiantes = data);
    this.userdata = this.userService.getUserData();
  }

	pdf(){

		this.router.navigate(['/app-pdf']);
	}
	goBack(){
		this._location.back();
	}
  doSubmit() {
    console.log(this.estudiantes);
    this.notas.id_estudiantes = this.estudiantes[0].id_estudiantes; 
    this.notas.id_grado = this.estudiantes[0].id_grados; 
    this.notas.id_seccion = this.estudiantes[0].id_seccion; 
    //this.notas.id_periodo = estudiantes.;
    this.route.params
    .switchMap((params: Params) => this.notasService.agregarNotas(this.notas, params['id']))
      .subscribe(data => this.notas = data);
  }

}
