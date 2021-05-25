import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  // Partial: every single property inside <> this type
  // is going to be optional, we don't have to provide all
  // of the configuration options. we can only provide a couple of them
  // and that is going to be fine. If we don't user Partial then
  // we have to provide every single configuration options that are inside there
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;

    // configuration options for bsConfig
    this.bsConfig = {
      containerClass: 'theme-red',
      // MMMM is month in long format like Octorber
      dateInputFormat: 'DD MMMM YYYY'
    }
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
