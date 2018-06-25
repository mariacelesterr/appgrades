import { Injectable } from '@angular/core';
import { Docentes} from '../models/docentes';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DocentesService {

	private docentesUrl = '/api/app-docentes/';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	crearDocente( docentes: Docentes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.docentesUrl, docentes, _params, _formParams);
	}
	obtenerPromedio(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		return this.apiService.perform('get', this.docentesUrl, _bodyData, _params, _formParams);
	}

}
