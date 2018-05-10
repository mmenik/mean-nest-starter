import { AutofocusDirective } from './autofocus.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
  <div>
    <input type="text" appAutofocus>
    <input type="text">
  </div>
  `
})
class TestAutofocusComponent { }

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestAutofocusComponent>;
  let focusEl: DebugElement[];
  let inputEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AutofocusDirective, TestAutofocusComponent]
    }).createComponent(TestAutofocusComponent);
    fixture.detectChanges();
    focusEl = fixture.debugElement.queryAll(By.directive(AutofocusDirective));
    inputEl = fixture.debugElement.query(By.css('input:not([appAutofocus])'));

  });

  it('should have one autofocus element', () => {
    expect(focusEl.length).toBe(1);
  });

  // it('should have focus on autofocus input element', () => {
  //   spyOn(focusEl[0].nativeElement, 'focus');
  //   expect(focusEl[0].nativeElement.focus).toHaveBeenCalled();
  //   // expect(focusEl[0].nativeElement.hasFocus()).toBe(true);
  // });

  // it('should have no focus on input element', () => {
  //   console.log(inputEl);
  //   expect(inputEl.nativeElement.hasFocus()).toBe(true);
  // });
});
