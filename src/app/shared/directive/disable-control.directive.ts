import { Platform } from '@angular/cdk/platform';
import {Directive, ElementRef, Injectable, Input, Renderer2, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import { SharedModule } from '../shared.module';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean ) {

    const action = condition ? false : true;
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', condition);

  }

  constructor(  private elementRef: ElementRef,
    private renderer: Renderer2, ) {
  }

}
