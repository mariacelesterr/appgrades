import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SeccionesService {

	private gradosUrl = 'api/app-secciones';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	obtenerSecciones(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.gradosUrl,_bodyData , _params, _formParams);
	}
}