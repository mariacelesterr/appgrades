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
  constructor(private seccionesService: SeccionesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  	this.seccionesService.obtenerSecciones()
    .subscribe(data => this.secciones = data);
  }

}
