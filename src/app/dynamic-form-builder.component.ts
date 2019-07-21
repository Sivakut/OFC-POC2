import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder ,FormArray } from '@angular/forms';

@Component({
  selector: 'dynamic-form-builder',
  template:`
    <form (ngSubmit)="onSubmit.emit(this.form.value)" [formGroup]="form">


    
     <div class="container">
      <div class="panel panel-primary">
        <div class="panel-heading">PERSONAL INFORMATION</div>
          <div class="form-group row">  
              
                 <div  *ngFor="let field of personalSectionFields let i=index" [ngClass]="'row'+ i%2"  >
       
                    <field-builder [field]="field" [form]="form"></field-builder>
                </div>   
               
            
        </div>
        </div>
      </div>  
      <div class="col-md-9">
          <button type="button" (click) = "saverec()">Add Beneficiaaries</button>
        
        </div>  <!--
      <div class="container">
      <div class="panel panel-primary">
        <div class="panel-heading">BENEFICIARY INFORMATION</div>
          <div class="form-group row">
             <div formArrayName="beneficiaryArrayInfo" *ngFor="let field of form.get('beneficiaryArrayInfo').controls let i=index" [ngClass]="'row'+ i%2"  >
                  <div [formGroupName]="i" >
                     <field-builder [field]="field" [form]="i"></field-builder>
                  </div>
              </div>
                </div>
          </div>
        </div>
      </div> --> 
     
    </form>
  `,
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() personalSectionFields: any[] = [];
  @Input() beneficiarySectionFields: any[] = [];
  
  public form: FormGroup;
  
  constructor( private fb: FormBuilder) {
    
   }

  ngOnInit() {
   // alert("dyna 1");
    let personalFormFieldsCtrls = {};
    let fieldsCtrls = {};
    console.log("fieldsCtrls started:"+this.personalSectionFields.length);
    for (let f of this.personalSectionFields) {
      console.log("fieldsCtrls type",f.type);
      if (f.type != 'checkbox') {
        personalFormFieldsCtrls[f.name] = [f.value || '', Validators.required];
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = [opt.value];
        }
        personalFormFieldsCtrls[f.name] = [opts];
      }
      //console.log("fieldsCtrls type",f.type);
      console.log("fieldsCtrls value personalFormFieldsCtrls",personalFormFieldsCtrls);
    }
   // this.form.addControl   personalInfo= new FormGroup(fieldsCtrls)
    for (let f of this.beneficiarySectionFields) {
      console.log("fieldsCtrls type",f.type);
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
      //console.log("fieldsCtrls type",f.type);
      console.log("fieldsCtrls value",fieldsCtrls);
    }
    console.log("fieldsCtrls last",fieldsCtrls);
    //this.form = new FormGroup(fieldsCtrls);
      //const persForm =new FormGroup(personalFormFieldsCtrls);
      const dynamicForm = new FormGroup(fieldsCtrls);
      //this.form =persForm;
      this.form = this.fb.group({
        creatPaymentArrayInfo: this.fb.array(
                      [personalFormFieldsCtrls]
                   )
        });
  /*  const persForm = new FormGroup( 
        personalFormFieldsCtrls,
        beneficiaryArrayInfo: new FormArray([
          dynamicForm
        ])
      ); 
      this.form =persForm;  */
  /* this.form = this.fb.group({
    personalFormFieldsCtrls,
      beneficiaryArrayInfo: this.fb.array([
        dynamicForm
      ])
    });   */ 
    //alert("dyna 2");
   // this.form.addControl('newte', new FormControl('', Validators.required));
  }
  //ngAfterViewInit(){
   // this.getContentJSON();
   // this.form.touched;
   // this.form.markAsTouched;
    //this.form.updateValueAndValidity;
 // }

  saverec() {
    // (this.formName.get('controllerArray') as FormArray).push(this.fb.group({controlerInputName1:''}));
    //this.getContentJSON();
    console.log("test alert1");
    ///this.form.addControl('testnew', new FormControl('', Validators.required));
    //console.log('this.form', );
    this.form.removeControl('firstname');
    let fieldsCtrls = {};
    for (let f of this.beneficiarySectionFields) {
      console.log("fieldsCtrls type",f.type);
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
      //console.log("fieldsCtrls type",f.type);
      console.log("fieldsCtrls value",fieldsCtrls);
    }
    console.log("fieldsCtrls last",fieldsCtrls);
    //console.log(this.form.value);
    (<FormArray>this.form.get('beneficiaryArrayInfo')).push(new FormGroup(fieldsCtrls));
    } 
    method() {
      this.form.addControl('new', new FormControl('', Validators.required));
    }
   // addControl(name: string, control: AbstractControl): void;
}
