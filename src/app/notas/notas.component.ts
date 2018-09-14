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
  estudiantes1: any;
  e: any;
  grado: any ;
  secciones: any;
  periodo: any;
  notas: any;
  grupo: any = [];
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
          if (this.periodo.length === 0){
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
          if(this.grado.length === 0){
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
        if(this.secciones.length === 0){
          alert('No hay secciones para escoger. Dirijase hasta la sección de secciones');
          this.router.navigate(['/'])}
      },
      error=>{
          alert('Hubo en error al cargar las secciones');
          console.log(error);
    });
    this.notasService.obtenerNotas1()
    .subscribe(data => {
      this.notas = data;
    },
    error=>{
        alert('Hubo en error al cargar las notas');
        console.log(error);
  });

  }
  doSubmit() {
    if (this.form.valid) {
      this.notasService.buscarEstudiante(this.estudiantes)
        .subscribe(data => 
          {
            if(data === 0){
              alert('No hay estudiantes para mostrar. Dirijase hasta el modulo de agregar estudiantes');
              this.router.navigate(['/'])
            }
            else{
              this.estudiantes1 = data;
              // Utilizo el método reduce para ir creando el array resultante
              let result = this.estudiantes1.reduce((prev, current, index, arr) => {
                // Compruebo si ya existe el elemento
                let exists = prev.find(x => x.id_estudiantes === current.id_estudiantes);
                // Si no existe lo creo con un array vacío en VALOR
                if (!exists) {
                  exists = {
                            id_estudiantes: current.id_estudiantes,
                            apellidos: current.apellidos,
                            celular: current.celular,
                            correo: current.correo,
                            descrip_1: current.descrip_1,
                            descrip_2: current.descrip_2,
                            descrip_3: current.descrip_3,
                            id_lapso: current.id_lapso,
                            id_notas_descrip: current.id_notas_descrip,
                            nombres: current.nombres,
                            grupo: [] 
                          };
                  prev.push(exists);
                }
                // Si el elemento actual tiene VALOR lo añado al array del
                // elemento existente
                if (current.id_notas_descrip != null){
                    exists.grupo.push({id_notas_descrip:current.id_notas_descrip,id_estudiantes:current.id_estudiantes,id_lapso:current.id_lapso});
             
                }
                // Devuelvo el array resultado para la nueva iteración
                return prev;
              }, []);
              this.e = result;
              console.log(this.e);
              this.hideElement = false;
            }
          },
          error =>{
            alert('Hubo un error en cargar los estudiantes');
          });
    }
    else{
      alert('Verifique los datos e intentelo de nuevo');
    }
  }
  borrarBole(id: number) {
      this.notasService.borrarBoletin(id).subscribe(data => 
          {
            alert('Se ha borrado con exito el Boletin');
            //this.router.navigate(['/'])
          },
          error => {
            console.log(error);
            alert('Lo sentimos ha ocurrido un error ')} );
    }
  

}
