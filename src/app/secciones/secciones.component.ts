import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { EscuelaService } from '../services/escuela.service';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
	secciones: any;
  secciones_obj: any ={
    descrp_sec:""
  };
  secciones1: any = ["A", "B", "C", "D", "E", "F"];
  @ViewChild('f') form: any;
  p: number = 1;
  constructor(private escuelaService: EscuelaService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location) { }

  ngOnInit() {
  	this.escuelaService.obtenerSecciones()
      .subscribe(data => {
        this.secciones = data
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
  doSubmit(){
    var result = [];
    if (this.form.valid) {
      this.secciones.forEach(function(element) {
      for (const prop in element) {
        result.push(element[prop]);}
      });
      var existe = result.includes(this.secciones_obj.descrp_sec) // true
      if(existe === true )
        {
          swal({
            title: '¡Advertencia!',
            text: 'Esta sección ya existe',
            type: 'warning',
            confirmButtonText: 'Cerrar'
          })
          this.router.navigate(['/app-secciones'])
        }
      else{
        this.escuelaService.agregarSecciones(this.secciones_obj)
          .subscribe(data => {
            swal({
              title: 'Aprobado',
              text: 'Se ha añadido la sección satisfactoriamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.router.navigate(['/app-secciones'])
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

    else {
      swal({
        title: '¡Error!',
        text: 'Los datos son erroneos, verifiquelos e intentelo de nuevo',
        type: 'error',
        confirmButtonText: 'Cerrar'
      })
      this.form.reset(); 
    }
  }
  goBack(){
    this._location.back();
  }

  borrarSec(id: number) {
    if (this.route.snapshot.url[0].path === 'app-secciones') {
      this.escuelaService.borrarSecciones(id)
        .subscribe(data => {
          swal({
            title: 'Aprobado',
            text: 'Se ha borrado con exito la sección',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/app-menu']);
        },
        error=>{
          swal({
            title: '¡Error!',
            text: 'No se pudo borrar la sección, ha ocurrido un error',
            type: 'error',
            confirmButtonText: 'Cerrar'
          })
          console.log(error);
        });
    }
  }

}
