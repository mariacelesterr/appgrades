import { Injectable } from '@angular/core';
import { Estudiantes} from '../models/estudiantes';
import { Notas } from '../models/notas';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class EstudiantesDetalles {
	estudiantes: Estudiantes;
	periodos: any[];
}

@Injectable()
export class NotasService {

	private estudiantesUrl = 'api/app-notas';
	private boletin_descripUrl = '/api/app-notas/app-boletin-descrip/';
	private pdfUrl = '/api/app-pdf/';
	private periodosUrl= 'api/app-periodo'

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

		return this.apiService.perform('post', this.boletin_descripUrl + id, notas, _params, _formParams);
	}
	obtenerEstudi(id: number): Observable<EstudiantesDetalles> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.boletin_descripUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	obtenerNotas(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.pdfUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	agregarPeriodo(periodo: any): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.periodosUrl +"-agregar";

		return this.apiService.perform('post', url, periodo, _params, _formParams);
	}
	obtenerPeriodo(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.periodosUrl, _bodyData, _params, _formParams);
	}
}
