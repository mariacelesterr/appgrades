import { Injectable } from '@angular/core';
import { Docentes} from '../models/docentes';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EstadisticasService {

	private estadisticasUrl = '/api/app-estadisticas/';  // URL to web api
	private estadisticasDetallesUrl = '/api/app-estadisticas';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	obtenerPromedio(estadisticas: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('post', this.estadisticasDetallesUrl , estadisticas, _params, _formParams);
	}
	obtenerPeriodo(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('get', this.estadisticasUrl, _bodyData, _params, _formParams);
	}

}