import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
 	public periodos1: any ={
    descrip_peri: '',
    id_periodo: null
  };
  periodo: any ;
 	datepickerset : any;
  final: any;
  inicio: any;
  @ViewChild('f') form: any;

  constructor(private notasService: NotasService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
 	this.datepickerset = {
      format: 'dd/mm/yyyy',
      selectMonths: true,
      today: false,
      selectYears: 10,
      //closeOnSelect: true,
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
    var per1= this.inicio.split(separador);
    var per2 = this.final.split(separador);
    var result = [];
    if (this.form.valid) {
      if(per1[2]===per2[2])
        alert("No pueden cuincidir los años");
      else if(per1[2]>per2[2])
        alert('Periodo no permitido');
      else{
          this.periodos1.descrip_peri = per1[2] + "-" + per2[2];
          this.periodo.forEach(function(element) {
            for (const prop in element) {
              result.push(element[prop]);}
            });
          var existe = result.includes(this.periodos1.descrip_peri) // true
          if(existe === true )
            alert('Este periodo ya existe');
          else{
            this.notasService.agregarPeriodo(this.periodos1)
              .subscribe( data => {
                  alert('Se ha añadido el periodo satisfactoriamente');
                  this.router.navigate(['/'])
                },error =>{
                  console.log(error);
                })
          }   
      }
    }
    this.form.reset();
  }

  borrarPer(id: number) {
    if (this.route.snapshot.url[0].path === 'app-periodo') {
      this.notasService.borrarPeriodo(id).subscribe(data => 
          {
            alert('Se ha borrado con exito el periodo');
            this.router.navigate(['/'])
          },
          error => {
            console.log(error);
            alert('Lo sentimos ha ocurrido un error ')} );
    }
  }
  

}
