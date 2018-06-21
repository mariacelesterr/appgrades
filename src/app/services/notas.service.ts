import { Injectable } from '@angular/core';
import { Estudiantes} from '../models/estudiantes';
import { Notas } from '../models/notas';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class NotasService {

	private estudiantesUrl = 'api/app-notas';
	private boletin_descrip = '/api/app-notas/app-boletin-descrip/';
	private pdf = '/api/app-pdf/';

	constructor(private apiService: ApiService) {
	}

	buscarEstudiante( estudiantes: Estudiantes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.estudiantesUrl, estudiantes, _params, _formParams);
	}
	agregarNotas( notas: Notas, id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.boletin_descrip + id, notas, _params, _formParams);
	}
	obtenerEstudi(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.boletin_descrip + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	obtenerNotas(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.pdf + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
}
