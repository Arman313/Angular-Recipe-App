import { Directive, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs:'appDropDown'
})
export class DropdownDirective {

  constructor() { }
  

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggle(){


    this.isOpen = !this.isOpen
  }
}
