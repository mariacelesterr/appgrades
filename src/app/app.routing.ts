import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { MenuComponent } from './menu/menu.component'
import { DocentesComponent } from './docentes/docentes.component'
import { EstudiantesComponent } from './estudiantes/estudiantes.component'
import { PdfComponent } from './pdf/pdf.component'
import { NotasComponent } from './notas/notas.component'
import { EstadisticasComponent } from './estadisticas/estadisticas.component'

const APP_ROUTES = [
  { 
  	path: '', 
  	component: MenuComponent, 
  	pathMatch: 'full' 
  },
  { 
  	path: 'app-docentes', 
  	component: DocentesComponent 
  },
  { 
  	path: 'app-estudiantes', 
  	component: EstudiantesComponent 
  },
  { 
  	path: 'app-pdf', 
  	component: PdfComponent 
  },
  { 
  	path: 'app-notas', 
  	component: NotasComponent 
  },
  { 
  	path: 'app-estadisticas', 
  	component: EstadisticasComponent 
  }
]

export const Routing = RouterModule.forRoot(APP_ROUTES)