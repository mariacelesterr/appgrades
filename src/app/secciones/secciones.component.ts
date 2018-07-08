import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { SeccionesService } from '../services/secciones.service';
import { Location } from '@angular/common';

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
  @ViewChild('f') form: any;
  constructor(private seccionesService: SeccionesService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location) { }

  ngOnInit() {
    this.secciones_obj.descrp_sec = 'Sección ';
  	this.seccionesService.obtenerSecciones()
    .subscribe(data => this.secciones = data);
  }
  doSubmit(){
    if (this.form.valid) {
      this.seccionesService.agregarSecciones(this.secciones_obj)
              .subscribe(data => {
                this.secciones_obj = data;
                alert('Se ha añadido el el grado satisfactoriamente');
                this.router.navigate(['/'])
              },
              error=>{
                console.log(error);
                alert('Lo sentimos ha ocurrido un error')
                this.router.navigate(['/'])
              });
      this.form.reset(); 
    }
    else {
      alert('Los datos ingresados son erroneos');
    }
  }
    goBack(){
    this._location.back();
  }
  borrarSec(id: number) {
    if (this.route.snapshot.url[0].path === 'app-secciones') {
      this.seccionesService.borrarSecciones(id).subscribe(data => {
          alert('Se ha borrado con exito la sección')
          this.router.navigate(['/']);
        },
        error=>{
          console.log(error);
          alert('Lo sentimos ha ocurrido un error')
          this.router.navigate(['/'])
        });
    }
  }

}
