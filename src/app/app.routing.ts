import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { MenuComponent } from './menu/menu.component'
import { DocentesComponent } from './docentes/docentes.component'
import { DetallesDocentesComponent } from './docentes/detalles.docentes.component'
import { EstudiantesComponent } from './estudiantes/estudiantes.component'
import { DetallesEstudiantesComponent} from './estudiantes/detalles.estudiantes.component'
import { BuscarEstudiantesComponent } from './estudiantes/buscar.estudiantes.component'
import { PdfComponent } from './pdf/pdf.component'
import { NotasComponent } from './notas/notas.component'

import { EstadisticasComponent, periodosEstadisticas, gradosEstadisticas, grados_seccionEstadisticas } from './estadisticas/estadisticas.component'


import { UsersComponent } from './users/users.component'
import { PerfilComponent } from './users/perfil/perfil.component'
import { BoletinDescripComponent } from './notas/boletin-descrip/boletin-descrip.component'
import { BoletinDescripDetallesComponent } from './notas/boletin-descrip/boletin-descrip-detalles.component'
import { PeriodoComponent } from './periodo/periodo.component'
import { GradosComponent } from './grados/grados.component'
import { SeccionesComponent } from './secciones/secciones.component'

const APP_ROUTES = [
  { 
    path: '',  
    pathMatch: 'full',
    redirectTo: 'login' 
  },
  { 
  	path: 'app-menu', 
  	component: MenuComponent,
  },
  { 
    path: 'app-docentes', 
    component: DocentesComponent 
  },
  { 
    path: 'app-docentes-agregar', 
    component: DocentesComponent 
  },
  { 
  	path: 'app-detalles-docentes/:id', 
  	component: DetallesDocentesComponent
  },
  { 
    path: 'app-estudiantes', 
    component: EstudiantesComponent 
  },
  { 
    path: 'app-buscar-estudiantes', 
    component: BuscarEstudiantesComponent 
  },
  { 
    path: 'app-detalles-estudiantes/:id', 
    component: DetallesEstudiantesComponent
  },
  { 
    path: 'app-periodo', 
    component: PeriodoComponent 
  },
  { 
    path: 'app-periodo-agregar', 
    component: PeriodoComponent 
  },
  { 
  	path: 'app-estudiantes/:id', 
  	component: EstudiantesComponent 
  },
  { 
    path: 'app-pdf/:id', 
    component: PdfComponent 
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
    path: 'app-notas/:id', 
    component: NotasComponent 
  },
  { 
    path: 'app-grados', 
    component: GradosComponent 
  },
  { 
    path: 'app-grados-agregar', 
    component: GradosComponent 
  },
  { 
    path: 'app-secciones', 
    component: SeccionesComponent 
  },
  { 
  	path: 'app-secciones-agregar', 
  	component: SeccionesComponent 
  },
  { 
    path: 'app-estadisticas', 
    component:  EstadisticasComponent 
  },
  { 
    path: 'periodos', 
    component:  periodosEstadisticas 
  },
  { 
    path: 'grados/:id', 
    component:  gradosEstadisticas
  },
  { 
    path: 'grados-seccion', 
    component: grados_seccionEstadisticas
  },
  { 
    path: 'app-estadisticas/detalles', 
    component:  EstadisticasComponent 
  },
  { 
    path: 'app-notas/boletin-descrip/:id', 
    component: BoletinDescripComponent 
  },
  { 
    path: 'app-notas/boletin-descrip', 
    component: BoletinDescripComponent 
  },
  { 
    path: 'app-notas/boletin-descrip-detalles/:id', 
    component: BoletinDescripDetallesComponent
  },
  { 
    path: 'login', 
    component: UsersComponent 
  },
  { 
    path: 'signup', 
    component: UsersComponent 
  },
  { 
    path: 'logout',
    component: UsersComponent 
  },
  { 
  	path: 'app-perfil', 
  	component: PerfilComponent 
  }
]

export const Routing = RouterModule.forRoot(APP_ROUTES)