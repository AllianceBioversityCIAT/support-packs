import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dataList]'
})
export class DataListDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
