import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { faBookmark, faClock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { DataListService } from 'projects/libs/sp-datalist/src/public-api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [    trigger('slideInOut', [
    state('in', style({
      overflow: 'hidden',
      height: '*',
      width: '*'
    })),
    state('out', style({
      opacity: '0',
      overflow: 'hidden',
      height: '0px',
      width: '0px'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]),
    trigger(
      'inOutAnimation',
      [
        transition(':enter', [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          // css styles at start of transition
          style({ opacity: 1 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class ResultsComponent implements OnInit {

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;

  @Input() filters;

  tools = [
    {
      name: "CSA Prioritisation Framework (CSA-PF)",
      link: "https://ccafs.cgiar.org/resources/tools/climate-smart-agriculture-prioritization-framework",
      importance_level: "Very important",
      description: "The CSA Prioritisation Framework (CSA-PF), designed for channelling CSA investments, has the objective to help decision makers identify best-bet CSA investment portfolios that achieve gains in food security, farmers’ resilience to climate change, and low-emissions development in the agriculture sector. The framework is divided into four phases: (i) initial assessment of CSA options; (ii) identification of top CSA options (workshop); (iii) calculation of cost and benefits of top CSA options; and (iv) portfolio development and evaluation of barriers (workshop).",
      strengths: "Incorporates expert and stakeholder views, often reflective of realities in the field  , Alignment with national programs and policies, Speed to completion, Farmer-centric.",
      limitations: "Subject to bias if groups are dominated by certain individuals (e.g. women left out)",
      resources: [
        {name: "1.1  Climate-smart solutions for Mali", link: "https://hdl.handle.net/10568/72419",type: "Reports and other publications" },
        {name: "1.2 Assessing climate change adaptation needs in the agricultural sector", link: "https://hdl.handle.net/10568/80014", type: "Reports and other publications"},
        {name: "1.3 Climate-smart agriculture investment prioritisation framework", link: "https://ccafs.cgiar.org/sites/default/files/projects/attachments/CSA%20Investment%20Prioritization%20Framework%20EN%20Dic2014.pdf",type: "Reports and other publications"},
        {name: "1.4 CSA prioritisation framework", link: "https://p4s.ccafs.cgiar.org/tools/csa-prioritization-framework",type: "Outreach products"},

      ]
    }
  ]

  constructor(private listServices: DataListService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    for (const propName in changes) {
      const changedProp = changes[propName];
      if (this.listServices.hasNull(changedProp.currentValue) && propName == 'ids') {
        // this.spinner.show()
        this.loadComponent(changedProp.currentValue)
      } else {
        // this.resetData();
      }
    }
  }

  loadComponent(params: any) {
    // this.isVisible = false;
    this.tools = []
    this.listServices.getRSC(params).subscribe(
      res => {
        // this.spinner.hide();
        this.tools = res;
        // console.log('res', this.recomendedDocs)
      },
      error => {
        // this.spinner.hide();
        console.error(error)
      }
    )
  }
  
  validateFilterData() {
    if(this.filters) {
      return this.filters.user !== null && this.filters.phase !== null && this.filters.area !== null;
    }
    return false;
  }

}
