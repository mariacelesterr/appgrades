import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SeccionesService {

	private seccionesUrl = 'api/app-secciones';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	obtenerSecciones(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.seccionesUrl, _bodyData , _params, _formParams);
	}
	agregarSecciones(secciones: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.seccionesUrl+"-agregar";

		return this.apiService.perform('post', url, secciones, _params, _formParams);
	}
	borrarSecciones(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.seccionesUrl + '/' + id, _bodyData, _params, _formParams);
	}
}