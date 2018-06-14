import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

// Routing
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { DocentesComponent } from './docentes/docentes.component';
import { PdfComponent } from './pdf/pdf.component';
import { NotasComponent } from './notas/notas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EstudiantesComponent,
    DocentesComponent,
    PdfComponent,
    NotasComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
