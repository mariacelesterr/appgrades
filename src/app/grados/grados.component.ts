import { Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from '../services/grados.service';
import { Router, ActivatedRoute } from '@angular/router';

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
              private router: Router,
              private gradosService: GradosService) { }

  ngOnInit() {
  	this.gradosService.obtenerGrados()
    .subscribe(data => this.grados = data);

  }
  doSubmit(){
    if (this.route.snapshot.url[0].path === 'app-grados-agregar') {
      if(this.form.valid){
        if (this.form.value.grados.trim() == "")
          alert("El campo no puede ser vacío");
        else{
          this.gradosService.agregarGrados(this.grados_obj)
            .subscribe(data => {
                alert('Se ha añadido el grado con exito');
                this.router.navigate(['/app-menu']);
              },
              error=>{
                alert('Ha ocurrido un error intentelo de nuevo');
                console.log(error);
                this.router.navigate(['/app-menu'])
  
              });
        }
      }
      else {
        alert('Los datos son erroneos, verifiquelos e intente de nuevo')
      }
    }
    else
      alert('Pagina no encontrada');    
  }
  borrarGra(id: number) {
    if (this.route.snapshot.url[0].path === 'app-grados') {
      this.gradosService.borrarGrados(id).subscribe(
        data => {
          this.router.navigate(['/app-menu']);
          alert('Se ha borrado con exito el grado')
      },
      error => {
        alert('No se pudo borrar el grado, ha ocurrido un error');
        console.log(error);
      });
    }
  }

}
