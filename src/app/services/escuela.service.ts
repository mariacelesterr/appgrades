import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EscuelaService {

	private periodoUrl = '/api/app-periodo/';
	private gradosUrl = 'api/app-grados';
	private seccionesUrl = 'api/app-secciones'; 

	constructor(private apiService: ApiService) {
	}

	obtenerPeriodo(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('get', this.periodoUrl, _bodyData, _params, _formParams);
	}
	agregarPeriodo(periodo: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.periodoUrl  +"-agregar";

		return this.apiService.perform('post', url, periodo, _params, _formParams);
	}
	borrarPeriodo(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.periodoUrl + '/' + id, _bodyData, _params, _formParams);
	}
	obtenerGrados(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.gradosUrl,_bodyData , _params, _formParams);
	}
	agregarGrados(grados: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.gradosUrl +"-agregar";

		return this.apiService.perform('post', url, grados, _params, _formParams);
	}
	borrarGrados(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.gradosUrl + '/' + id, _bodyData, _params, _formParams);
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