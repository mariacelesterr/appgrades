import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule} from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MorrisJsModule } from 'angular-morris-js';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';


// Routing
import { Routing} from './app.routing';

//Service
import { UserService } from './services/user.service'
import { ApiService } from './services/api.service'
import { DocentesService } from './services/docentes.service'
import { EstudiantesService } from './services/estudiantes.service';
import { NotasService } from './services/notas.service';
import { EstadisticasService } from './services/estadisticas.service';
import { GradosService } from './services/grados.service';
import { SeccionesService } from './services/secciones.service';
import { EscuelaService  } from './services/escuela.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { DetallesEstudiantesComponent } from './estudiantes/detalles.estudiantes.component';
import { BuscarEstudiantesComponent } from './estudiantes/buscar.estudiantes.component';
import { DocentesComponent } from './docentes/docentes.component';
import { DetallesDocentesComponent } from './docentes/detalles.docentes.component';
import { PdfComponent } from './pdf/pdf.component';
import { NotasComponent } from './notas/notas.component';
import { EstadisticasComponent, periodosEstadisticas, gradosEstadisticas, grados_seccionEstadisticas } from './estadisticas/estadisticas.component';
import { UsersComponent } from './users/users.component';
import { BoletinDescripComponent } from './notas/boletin-descrip/boletin-descrip.component';
import { BoletinDescripDetallesComponent } from './notas/boletin-descrip/boletin-descrip-detalles.component'
import { PerfilComponent } from './users/perfil/perfil.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { GradosComponent } from './grados/grados.component';
import { SeccionesComponent } from './secciones/secciones.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EstudiantesComponent,
    BuscarEstudiantesComponent,
    DetallesEstudiantesComponent,
    DocentesComponent,
    DetallesDocentesComponent,
    PdfComponent,
    NotasComponent,
    EstadisticasComponent,
    periodosEstadisticas,
    gradosEstadisticas, 
    grados_seccionEstadisticas,
    UsersComponent,
    BoletinDescripComponent,
    PerfilComponent,
    PeriodoComponent,
    GradosComponent,
    SeccionesComponent,
    BoletinDescripDetallesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    MorrisJsModule,
    Routing,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    ChartsModule
  ],
  providers: [
    ApiService,
    UserService,
    DocentesService,
    EstudiantesService,
    NotasService,
    EstadisticasService,
    GradosService,
    SeccionesService,
    EscuelaService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
