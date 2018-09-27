import { Injectable } from '@angular/core';
import { Estudiantes} from '../models/estudiantes';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EstudiantesService {

	private estudiantesUrl = 'api/app-estudiantes';  // URL to web api
	private buscarestudiantesUrl = 'api/app-buscar-estudiantes/';  // URL to web api
	private detallesEstudiantesUrl = 'api/app-detalles-estudiantes/';  // URL to web api

	constructor(private apiService: ApiService) {
	}

	agregarEstudi( estudiantes: Estudiantes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};

		return this.apiService.perform('post', this.estudiantesUrl, estudiantes, _params, _formParams);
	}
	obtenerEstudiantes(): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('get', this.buscarestudiantesUrl , _bodyData , _params, _formParams);
	}
	obtenerEstudi(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};
		const url = this.detallesEstudiantesUrl + id;

		return this.apiService.perform('get', url, _bodyData, _params, _formParams);
	}
	editEstudi(estudiantes: Estudiantes): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const url = this.detallesEstudiantesUrl + estudiantes.id_estudiantes;

		return this.apiService.perform('put', url, estudiantes, _params, _formParams);
	}
	borrarEstudiante(id: number): Observable<any> {
		const _params: any = {};
		const _formParams: any = {};
		const _bodyData: any = {};

		return this.apiService.perform('delete', this.detallesEstudiantesUrl + id, _bodyData, _params, _formParams);
	}
}
