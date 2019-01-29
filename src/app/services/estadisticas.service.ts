import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EstadisticasService {

	private estadisticassUrl = '/api/app-estadisticas';  // URL to web api
	private estadisticasPeriodos = '/api/periodos';
	private estadisticasGrados = '/api/grados/';



	constructor(private apiService: ApiService) {
	}
	obtenerPromedioPeriodo(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('get', this.estadisticasPeriodos, _bodyData, _params, _formParams);
	}
	obtenerPromedioGrados(id: number): Observable<any> {

		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url  = this.estadisticasGrados + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}

	obtenerPromedioGradosSec(estadisticas: any): Observable <any>{
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.estadisticassUrl , estadisticas, _params, _formParams);
	
	}


}