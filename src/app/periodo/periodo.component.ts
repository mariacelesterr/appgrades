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
  periodo: any ;
  periodo1: any = {
    descrip_peri: " ",
    id_periodo: null
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
          this.periodo1.descrip_peri = per1[2] + "-" + per2[2];
          this.notasService.agregarPeriodo(this.periodo1)
            .subscribe(data => this.periodo1 = data);
            alert('Se ha añadido el periodo satisfactoriamente');
          }
  }
  borrarPer(id: number) {
    if (this.route.snapshot.url[0].path === 'app-periodo') {
      this.notasService.borrarPeriodo(id).subscribe(data => {
          alert('Se ha borrado con exito la sección');
      });
    }
  }

}
