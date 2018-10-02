import { Injectable } from '@angular/core';
import { Docentes} from '../models/docentes';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DocentesService {

	private docentesUrl = '/api/app-docentes';  // URL to web api
	private detallesDocentesUrl = '/api/app-detalles-docentes/';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	crearDocente( docentes: Docentes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.docentesUrl + '-agregar', docentes, _params, _formParams);
	}
	obtenerDocentes(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.docentesUrl , _bodyData , _params, _formParams);
	}
	obtenerDocen(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.detallesDocentesUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	editDocente(docentes: Docentes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.detallesDocentesUrl + docentes.id_docentes;

		return this.apiService.perform('put', url, docentes, _params, _formParams);
	}
	borrarDocente(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.detallesDocentesUrl + id, _bodyData, _params, _formParams);
	}

}
