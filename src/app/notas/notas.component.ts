import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { Estudiantes } from '../models/estudiantes';
import { NotasService } from '../services/notas.service';
import { EscuelaService } from '../services/escuela.service';

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
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private escuelaService: EscuelaService,
    private _location: Location) {}

  ngOnInit() {
    this.escuelaService.obtenerPeriodo()
      .subscribe(
        data =>{ 
          this.periodo = data;
          if (this.periodo.length === 0){
            swal({
                  title: '¡Advertencia!',
                  text: 'No hay peridos para escoger. Dirijase hasta la sección de periodo',
                  type: 'warning',
                  confirmButtonText: 'Cerrar'
                })
              this.router.navigate(['/app-periodo'])
          }    
        },
        error => {
          swal({
                title: '¡Error!',
                text: 'Hubo un error al cargar los periodos',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
          console.log(error);
        });
    this.escuelaService.obtenerGrados()
      .subscribe(
        data => {
          this.grado = data;
          if(this.grado.length === 0){
            swal({
                  title: '¡Advertencia!',
                  text: 'No hay grados para escoger. Dirijase hasta la sección de grados',
                  type: 'warning',
                  confirmButtonText: 'Cerrar'
                })
              this.router.navigate(['/app-grados'])
          }
        },
        error => {
          swal({
                title: '¡Error!',
                text: 'Hubo un error al cargar los grados',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
          console.log(error);
        });
    this.escuelaService.obtenerSecciones()
      .subscribe(
        data => {
          this.secciones = data;
          if(this.secciones.length === 0){
            swal({
                title: '¡Advertencia!',
                text: 'No hay secciones para escoger. Dirijase hasta la sección de secciones',
                type: 'warning',
                confirmButtonText: 'Cerrar'
              })
          this.router.navigate(['/app-secciones'])}
        },
        error=>{
          swal({
                title: '¡Error!',
                text: 'Hubo un error al cargar las secciones',
                type: 'error',
                confirmButtonText: 'Cerrar'
              })
          console.log(error);
        });
  }
  doSubmit() {
    if (this.form.valid) {
      this.notasService.buscarEstudiante(this.estudiantes)
        .subscribe(data => 
          {
            if(data.length === 0){
              swal({
                title: '¡Advertencia!',
                text: 'No hay estudiantes para mostrar. Dirijase hasta el modulo de agregar estudiantes',
                type: 'warning',
                confirmButtonText: 'Cerrar'
              })
              this.router.navigate(['/app-menu'])
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
                  exists.grupo.push(
                    {
                      id_notas_descrip:current.id_notas_descrip,
                      id_estudiantes:current.id_estudiantes,
                      id_lapso:current.id_lapso
                    });
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
            swal({
              title: '¡Error!',
              text: 'Hubo un error en cargar los estudiantes',
              type: 'error',
              confirmButtonText: 'Cerrar'
            })
            console.log(error);
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
  borrarBole(id: number) {
    this.notasService.borrarBoletin(id)
      .subscribe(data => 
        {
          swal({
            title: 'Aprobado',
            text: 'Se ha borrado con exito el Boletin',
            type: "success",
            confirmButtonText: 'Cerrar',
          });
          this.router.navigate(['/app-menu'])
        },
        error => {
          swal({
            title: '¡Error!',
            text: 'Ha ocurrido un error al borrar el boletin',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
          console.log(error);
        });
  }
  goBack(){
    this._location.back();
  }
}
