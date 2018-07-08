import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { NotasService } from '../services/notas.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { GradosService } from '../services/grados.service';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  hideElement = true;
  estudiantes: Estudiantes = new Estudiantes();
  grado: any ;
  secciones: any;
  periodo: any;
  @ViewChild('f') form: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private estadisticasService : EstadisticasService,
    private gradosService: GradosService,
    private seccionesService: SeccionesService) {}

  ngOnInit() {
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
  doSubmit() {
    if (this.form.valid) {
    	this.hideElement = false;
      this.notasService.buscarEstudiante(this.estudiantes)
        .subscribe(data => this.estudiantes = data);
        console.log(this.estudiantes);
    }
    else{
      alert('Verifique los datos e intentelo de nuevo');
    }
  }
  

}
