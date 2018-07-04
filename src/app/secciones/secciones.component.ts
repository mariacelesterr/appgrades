import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeccionesService } from '../services/secciones.service'

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
  constructor(private seccionesService: SeccionesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  	this.seccionesService.obtenerSecciones()
    .subscribe(data => this.secciones = data);
  }
  doSubmit(){
    console.log(this.secciones_obj.descrp_sec);
    this.seccionesService.agregarSecciones(this.secciones_obj)
            .subscribe(data => this.secciones_obj = data);
            alert('Se ha añadido el el grado satisfactoriamente');    
  }
  borrarSec(id: number) {
    if (this.route.snapshot.url[0].path === 'app-secciones') {
      this.seccionesService.borrarSecciones(id).subscribe(data => {
        console.log(data);
        if (data.status === 200) {
          this.router.navigate(['/app-menu']);
          alert('Se ha borrado con exito la sección')
        }
      });
    }
  }

}
