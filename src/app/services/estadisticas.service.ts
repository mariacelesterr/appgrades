import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EstadisticasService {

	private estadisticasDetallesUrl = '/api/app-estadisticas';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	obtenerPromedio(estadisticas: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('post', this.estadisticasDetallesUrl , estadisticas, _params, _formParams);
	}

}