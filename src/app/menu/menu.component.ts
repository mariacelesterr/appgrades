import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private estudiantes: any;
  constructor(private estudiantesService: EstudiantesService,
  	private route: ActivatedRoute,
    private router: Router) { 
  	pdfMake.vfs = pdfFonts.pdfMake.vfs; 
  }

  ngOnInit() {
  	/*this.estudiantesService.obtenerEstudiantes()
          .subscribe(data =>{
            this.estudiantes = data;
            if(this.estudiantes == null)
              alert('No hay estudiantes para mostrar')},
            error =>{
              alert('No se pudo cargar los estudiantes');
              this.router.navigate(['/']);
            }) */
  }
  externalDataRetrievedFromServer: any = [
    { name: 'Bartek', age: 34 },
    { name: 'John', age: 27 },
    { name: 'Elizabeth', age: 30 },
];
 buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];
        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
            console.log(dataRow);
        })

        body.push(dataRow);
    });

    return body;
}

table(data, columns) {
    return {
        table: {
            headerRows: 1,
            body: this.buildTableBody(data, columns)
        }
    };
}

 grafica(){


console.log(this.estudiantes);
 	var docDefinition = { 
	   content: [
        { text: 'Dynamic parts', style: 'header' },
        this.table(this.estudiantes, ['apellidos','cedula','celular','correo','dateofbirth','descrip_gra','descrp_sec','direccion','id_estudiantes','id_grados','id_periodo','id_seccion','nombres','telefono'])
    ]
	
    }
    pdfMake.createPdf(docDefinition).open();
 }
}
