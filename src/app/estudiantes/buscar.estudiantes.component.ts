import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { UserService } from '../services/user.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { GradosService } from '../services/grados.service';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-buscar-estudiantes',
  templateUrl: './buscar.estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class BuscarEstudiantesComponent implements OnInit {
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
    if (this.route.snapshot.url[0].path == 'app-buscar-estudiantes'){
          this.EstudiantesService.obtenerEstudiantes()
          .subscribe(data =>{
            this.estudiantes = data;
            if(this.estudiantes == null)
              alert('No hay estudiantes para mostrar')},
            error =>{
              alert('No se pudo cargar los estudiantes');
              this.router.navigate(['/']);
            }) 
      }
  }
  
  goBack(){
    this._location.back();
  }
  doSubmit() {
    if (this.route.snapshot.url[0].path === 'app-buscar-estudiantes') {
      if(this.form.valid){
        this.EstudiantesService.agregarEstudi(this.estudiantes)
          .subscribe(
            data => {
              alert('Se ha añadido el estudiante con exito');
              this.router.navigate(['/app-estudiantes', data.id_estudiantes]);
            },
            error=>{
              alert('Ha ocurrido un error intentelo de nuevo');
              console.log(error);
              this.router.navigate(['/'])

            });
      }
      else{
        alert('Los datos son erroneos, verifiquelos e intentelo de nuevo')
      }
    }
  }

}

 
