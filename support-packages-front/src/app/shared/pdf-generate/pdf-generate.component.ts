import { Component, Input, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.scss']
})
export class PdfGenerateComponent implements OnInit{
  

  @Input() data: any;
  constructor() { }
  
  ngOnInit(): void {
    
  }

  generatePdf() {
    console.log(this.data);

    let documentationPdf = {
      content:[],
      styles: {
        header: {
          fontSize: 18,
          bold: true, color: 'blue'
        },
        Subheader: {
          fontSize: 15,
          italics: true,
          bold:true
        }
      }
    };
    

    this.data.forEach((element: any) => {
      documentationPdf.content.push({text: element.name, style: 'header', link: element.source,  color: 'blue'});
      documentationPdf.content.push({text: element.description});
      documentationPdf.content.push({text: [
        {text: 'Time : ' , bold: true},
        {text: element.estimated_time},
      ]});
      documentationPdf.content.push({text: 
        [
          {text: 'Strengths : ' , bold: true},
          {text: element.strengths.replace(/(\r\n|\n|\r)/gm, "")},
        ]
        });
      documentationPdf.content.push({text: 
        [
          {text: 'Limitations : ' , bold: true},
          {text: element.limitations},
        ]
        });
      documentationPdf.content.push({text:
        [
          {text : 'Does the tool integrate gender? : ', bold:true},
          {text : element.integrates_gender}
        ]
        });
      documentationPdf.content.push({text: 
        [
          {text : 'Target scale : ', bold:true},
          {text :element.target_scale}
        ]
        });
        
      documentationPdf.content.push({text: 
        [
          {text : 'Participants : ', bold:true},
          {text :element.participants}
        ]
        });
        
      documentationPdf.content.push({text: 
        [
          {text : 'Methods used : ', bold:true},
          {text :element.methods}
        ]
        });
       
      documentationPdf.content.push({text: 
        [
          {text : 'Types of input data/information : ', bold:true},
          {text :element.input_types}
        ]
        });
        
      documentationPdf.content.push({text: 
        [
          {text : 'Expected outputs : ', bold:true},
          {text :element.expected_outputs}
        ]
        });
        
      documentationPdf.content.push({text: 
        [
          {text : 'Human resources : ', bold:true},
          {text :element.human_resources}
        ]
        });
      documentationPdf.content.push({text: 'Recommended resources', style: 'Subheader', color: 'black'});
      element.resources.forEach((resource: any) => {
        documentationPdf.content.push({text: 'Resource : '+resource.name});
        documentationPdf.content.push({text: 'Type : '+resource.type});
        documentationPdf.content.push({text: 'Link : '+resource.source,  color: 'blue'});
      });
    });
    
   
    pdfMake.createPdf(documentationPdf).download();
  }

}
