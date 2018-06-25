import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Routing
import { Routing } from './app.routing';

//Service
import { UserService } from './services/user.service'
import { ApiService } from './services/api.service'
import { DocentesService } from './services/docentes.service'
import { EstudiantesService } from './services/estudiantes.service';
import { NotasService } from './services/notas.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { DocentesComponent } from './docentes/docentes.component';
import { PdfComponent } from './pdf/pdf.component';
import { NotasComponent } from './notas/notas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { UsersComponent } from './users/users.component';
import { BoletinDescripComponent } from './notas/boletin-descrip/boletin-descrip.component';
import { PerfilComponent } from './users/perfil/perfil.component';
import { PeriodoComponent } from './periodo/periodo.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EstudiantesComponent,
    DocentesComponent,
    PdfComponent,
    NotasComponent,
    EstadisticasComponent,
    UsersComponent,
    BoletinDescripComponent,
    PerfilComponent,
    PeriodoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    Routing,
  ],
  providers: [
    ApiService,
    UserService,
    DocentesService,
    EstudiantesService,
    NotasService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
