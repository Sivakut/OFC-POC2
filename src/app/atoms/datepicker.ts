import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'datepicker',
    template: `
      <div [formGroup]="form">
        <input  type="date" class="form-control"
         [id]="field.name" [name]="field.name" [formControlName]="field.name">
         
      </div> 
    `
})
export class DatePickerComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }
}