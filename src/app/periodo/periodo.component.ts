import { Component, OnInit } from '@angular/core';
import { NotasService } from '../services/notas.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
 	periodos1: string;
  periodos2: string;
  periodo: any = {
    descrip_peri: " ",
  };
 	datepickerset : any;

  constructor(private notasService: NotasService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
 	this.datepickerset = {
      format: 'dd/mm/yyyy',
      selectMonths: true,
      today: false,
      selectYears: 10,
      closeOnSelect: true,
      //max: new Date(),
      //disable: [true],
      clear: 'Cerrar',
      close: 'Guardar',
      buttonImageOnly: false,
      formatSubmit: "yyyy",
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
      weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
    }
  this.notasService.obtenerPeriodo()
    .subscribe(data => this.periodo = data);
  }


  doSubmit() {
    var separador = "/";
    var per1= this.periodos1.split(separador);
    var per2 = this.periodos2.split(separador);
      if(per1[2]===per2[2])
        alert("No pueden cuincidir los años");
      else{
          this.periodo.descrip_peri = per1[2] + "-" + per2[2];
          this.notasService.agregarPeriodo(this.periodo)
            .subscribe(data => this.periodo = data);
            alert('Se ha añadido el periodo satisfactoriamente');
          }
  }

}
