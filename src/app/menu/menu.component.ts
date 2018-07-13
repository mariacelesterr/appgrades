import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	public periodos1: any ={
    descrip_peri: 'Hola 1',
    id_periodo: null
  };
   weekdaysLetter: any = [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ];
  constructor() { 
  	pdfMake.vfs = pdfFonts.pdfMake.vfs; 
  }

  ngOnInit() {
  }
 grafica(){

 	var docDefinition = { 
	    content:[
	      {
	      	text: 'Tables', 
	      	style: 'header'
	      },
			'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
			{
				text: 'A simple table (no headers, no width specified, no spans, no styling)', 
				style: 'subheader'
			},
			'The following table has nothing more than a body array',
			{
				style: 'tableExample',
				table: {
					body: [
						//this.weekdaysLetter.forEach(e => {console.log(e)})
						['Alumnos', 'hola1 ','Column 3'],
						['hola', 'Another one here', 'OK?']
					]
				}
			}
	        
	      ],
	    styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				margin: [0, 5, 0, 15]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		}
	
    }
    pdfMake.createPdf(docDefinition).open();
 }
}
