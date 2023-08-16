import { Platform } from '@angular/cdk/platform';
import {Directive, ElementRef, Injectable, Input, Renderer2, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import { SharedModule } from '../shared.module';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean ) {

    if(this.ngControl.control) {
      const action = condition ? 'disable' : 'enable';
      this.ngControl.control[action]();
  
    }
    
  }

  constructor(  private elementRef: ElementRef,
    private renderer: Renderer2, 
    @Self()  private ngControl: NgControl) {
  }

}
