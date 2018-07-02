import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GradosService {

	private gradosUrl = 'api/app-grados/';  // URL to web api

	constructor(private apiService: ApiService) {
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

		return this.apiService.perform('delete', this.gradosUrl + id, _bodyData, _params, _formParams);
	}
}