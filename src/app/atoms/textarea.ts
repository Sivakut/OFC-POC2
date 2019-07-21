import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textarea',
    template: `
      <div [formGroup]="form">
          <textarea   [formControlName]="field.name" [id]="field.name"
          class="form-control" [placeholder]="field.placeholder"  cols="2" rows="5" ></textarea>
      </div> 
    `
})
export class TextAreaComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }
}