import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './atoms/textbox';
import { DropDownComponent } from './atoms/dropdown';
import { FileComponent } from './atoms/file';
import { CheckBoxComponent } from './atoms/checkbox';
import { RadioComponent } from './atoms/radio';
import { DatePickerComponent } from './atoms/datepicker';
import { TextAreaComponent } from './atoms/textarea';
import { DynamicPaymentFormComponent } from './dynamicpayment/dynamicpayment.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    TextAreaComponent,
    DatePickerComponent,
    DynamicPaymentFormComponent
  ],
  exports: [DynamicFormBuilderComponent,DynamicPaymentFormComponent],
  providers: []
})
export class DynamicFormBuilderModule { }
