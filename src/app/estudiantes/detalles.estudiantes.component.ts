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
  selector: 'app-detalles-estudiantes',
  templateUrl: './detalles.estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class DetallesEstudiantesComponent implements OnInit {
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
    if (this.route.snapshot.url[0].path == 'app-detalles-estudiantes'){
          this.route.params
            .switchMap((params: Params) => this.EstudiantesService.obtenerEstudi(params['id']))
            .subscribe(data =>{
              this.estudiantes = data;
              if(this.estudiantes == null)
                alert('No hay estudiante para mostrar')},
              error =>{
                alert('Hubo un error al buscar el estudiante');
                this.router.navigate(['/']);
              })         
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
    if(this.form.valid){
      console.log(this.estudiantes);
      this.EstudiantesService.editEstudi(this.estudiantes)
        .subscribe(
          data => {
            alert('Se ha actualizado el estudiante con exito');
            this.router.navigate(['/app-buscar-estudiantes']);
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
  borrarEstu(id: number) {
    this.route.params
      .switchMap((params: Params) => this.EstudiantesService.borrarEstudiante(params['id']))
      .subscribe(data => 
        {
          alert('Se ha borrado con exito el estudiante');
          this.router.navigate(['/'])
        },
        error => {
          console.log(error);
          alert('Lo sentimos ha ocurrido un error ')} );   
      }

}

 
