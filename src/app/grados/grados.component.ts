import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute,
              private router: Router,
              private gradosService: GradosService) { }

  ngOnInit() {
  	this.gradosService.obtenerGrados()
    .subscribe(data => this.grados = data);

  }
  doSubmit(){
    console.log(this.grados_obj.descrip_gra);
    this.gradosService.agregarGrados(this.grados_obj)
            .subscribe(data => this.grados_obj = data);
            alert('Se ha añadido el el grado satisfactoriamente');    
  }
  

}
