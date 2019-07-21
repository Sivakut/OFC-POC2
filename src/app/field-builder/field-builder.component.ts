import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'field-builder',
  template: `
    <div  [formGroup]="form">
                   <div  [ngSwitch]="field.type"  class="form-group col-md-6">
            
                      <label  [attr.for]="field.label">
                        {{field.label}}
                       </label>
                          <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
                          <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
                          <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
                          <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
                          <textarea *ngSwitchCase="'textarea'" [field]="field" [form]="form"></textarea>
                          <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
                          <datepicker *ngSwitchCase="'datepicker'" [field]="field" [form]="form"></datepicker>
                </div>
  </div>
  `
})
export class FieldBuilderComponent implements OnInit {
  @Input() field:any;
  @Input() form:any;
  
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() { 

    //alert('FieldBuilderComponent');
  }

  ngOnInit() {
  }

}
