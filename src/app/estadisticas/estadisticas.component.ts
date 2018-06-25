import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { Notas } from '../models/notas'

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
notas: Notas = new Notas;
  constructor() { }

  ngOnInit() {
  }
//...
  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
  	console.log(this.notas.nota_cuali);
    this.modalActions.emit({action:"modal",params:['close']});
  }
  doSubmit(){
  	console.log(this.notas.nota_cuali);
  }
}
