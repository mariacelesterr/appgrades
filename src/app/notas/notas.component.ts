import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../models/estudiantes';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  hideElement = true;
  estudiantes: Estudiantes = new Estudiantes();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService) {}

  ngOnInit() {
  }

  onClick(){
  }
  doSubmit() {
  	this.hideElement = false;
    this.notasService.buscarEstudiante(this.estudiantes)
      .subscribe(data => this.estudiantes = data);
      console.log(this.estudiantes);
  }
  

}
