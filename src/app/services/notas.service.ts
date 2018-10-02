import { Injectable } from '@angular/core';
import { Estudiantes} from '../models/estudiantes';
import { Notas } from '../models/notas';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class NotasDetalles {
	notas: Notas;
	estudiantes: any[];
}
@Injectable()
export class NotasService {

	private estudiantesUrl = 'api/app-notas';
	private boletin_descripUrl = '/api/app-notas/app-boletin-descrip/';
	private boletin_descripUrl2 = '/api/app-notas/boletin-descrip-detalles/';
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
	obtenerEstudi(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.boletin_descripUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	obtenerN2(id: number): Observable<NotasDetalles> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.boletin_descripUrl2 + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	modificarNotas(notas: Notas): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.boletin_descripUrl2 + notas.id_notas_descrip;

		return this.apiService.perform('put', url, notas, _params, _formParams);
	}
	obtenerNotas(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.pdfUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	obtenerNotas1(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.estudiantesUrl;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	borrarBoletin(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.estudiantesUrl + '/' + id, _bodyData, _params, _formParams);
	}
	
}
