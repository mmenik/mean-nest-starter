import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    console.log('autofocus init');
    this.el.nativeElement.focus();
  }
}
