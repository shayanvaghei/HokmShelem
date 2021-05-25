import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})

// this is a template for reactive forms

// we want to access FormControls inside this template
// so instead of implementing OnInit we implement ControlValueAccessor
// for example formControlName='confirmPassword' is a native form control
// in the dom. we want to access that

export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() extraInformation: string;
  @Input() type = 'text'; // initial property of the passed in value is text

  // we need to inject the control into the constructor of this Controler
  // so we use from Self
  // Angular will inject here thing locally here using by Self
  // the dependence are injected locally and does not try to get this
  // ngControl from somewhere else in the dependency tree
  // NgControl is a based class that all FormControl directives extend
  // So we want to inject this inside here
  constructor(@Self() public ngControl: NgControl) {
    // by adding this, we have access to our control
    // inside this component when want to use it
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
  }

}
