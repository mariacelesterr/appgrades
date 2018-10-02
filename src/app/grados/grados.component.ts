import { Component, OnInit, ViewChild } from '@angular/core';
import { EscuelaService } from '../services/escuela.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {

	grados: any;
  grados_obj: any ={
    descrip_gra:""
  };
  @ViewChild('f') form: any;
  constructor(private route: ActivatedRoute,
              private _location: Location,
              private router: Router,
              private escuelaService: EscuelaService) { }

  ngOnInit() {
  	this.escuelaService.obtenerGrados()
      .subscribe(data => {
          this.grados = data
        },
        error=>{
          swal({
            title: '¡Error!',
            text: 'Hubo un error al cargar los grados',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
          console.log(error);
        });

  }
  doSubmit(){
    var result = [];
    if (this.route.snapshot.url[0].path === 'app-grados-agregar') {
      if(this.form.valid){
        if (this.form.value.grados.trim() == "")
          swal({
                title: '¡Advertencia!',
                text: "El campo no puede ser vacío",
                type: 'warning',
                confirmButtonText: 'Cerrar'
              })
        else{
          this.grados.forEach(function(element) {
            for (const prop in element) {
              result.push(element[prop]);}
            });
          var existe = result.includes(this.grados_obj.descrip_gra) // true
          if(existe === true )
            swal({
              title: '¡Advertencia!',
              text: 'Este grado ya existe',
              type: 'warning',
              confirmButtonText: 'Cerrar'
            })
          else{
            this.escuelaService.agregarGrados(this.grados_obj)
              .subscribe(data => {
                swal({
                  title: 'Aprobado',
                  text: 'Se ha añadido el grado con exito',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
                this.router.navigate(['/app-grados']);
                },
                error=>{
                  swal({
                    title: '¡Error!',
                    text: 'Ha ocurrido un error intentelo de nuevo',
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                  console.log(error);
                  this.router.navigate(['/app-menu'])
                }); 
          }
        }
      }
      else {
        swal({
          title: '¡Error!',
          text: 'Los datos son erroneos, verifiquelos e intentelo de nuevo',
          type: 'error',
          confirmButtonText: 'Cerrar'
        })
      }
    }
    else{
      swal({
          title: '¡Error!',
          text: 'Pagina no encontrada',
          type: 'error',
          confirmButtonText: 'Cerrar'
        })
    }
  }
  borrarGra(id: number) {
    if (this.route.snapshot.url[0].path === 'app-grados') {
      this.escuelaService.borrarGrados(id).subscribe(
        data => {
          swal({
            title: 'Aprobado',
            text: 'Se ha borrado con exito el grado',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/app-menu']);
      },
      error => {
        if(error.message.errno == 1451){
          swal({
            title: '¡Error!',
            text: 'No se pudo borrar el grado porque hay estudiantes que contienen este grado',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
        else
        {
          swal({
            title: '¡Error!',
            text: 'No se pudo borrar el grado, ha ocurrido un error',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
        console.log(error);
      });
    }
  }
  goBack(){
    this._location.back();
  }

}
