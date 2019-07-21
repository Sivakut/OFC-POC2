import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonServiceService } from './json-service.service';
import {
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';
import { MessageComponent } from './message.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import * as $ from 'jquery';
import { DynamicPaymentFormComponent } from "./dynamicpayment/dynamicpayment.component";

@Component({
  selector: 'app-root',
  template:`
          <!--  <dynamic-form-builder *ngIf="childComponentLoaded" [fields]="getFields()">
          </dynamic-form-builder>  -->
          <app-dynamicpayment></app-dynamicpayment>
        
        
        <!--  <div style="text-align:center">
            <button (click)="createComponent('Welcome Foo ! ')">Welcome</button>
            <button (click)="createComponent('Foo Again ?')">Not Welcome</button>
            <button (click)="createDynaComponent('Siva')">Click Dynamic</button>
            
     <template #messagecontainer>
     </template>
     <template #dynamiccontainer>
     </template>  
 </div>  -->
            ` 
})
/* interface dynaFormModel {
  type: string;
  name: string;
  label: string;
  value: string;
  required: boolean;
  options: string;
}; */
export class AppComponent {
  public form: FormGroup;
  unsubcribe: any;
  title = 'app';
  public message : string ='Siva';
  @ViewChild('messagecontainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
   @ViewChild('dynamiccontainer', { read: ViewContainerRef, static: true }) entry1: ViewContainerRef;
   @ViewChild('samplecontainer', { read: ViewContainerRef, static: true }) entry2: ViewContainerRef;
 
   public childComponentLoaded: boolean = false;
  
  componentRef: any;
  public personalSectionFields : any[]= [
    {
      type: 'text',
      name: 'rrrrrrr',
      label: 'Test',
      value: '',
      required: true,
    }
  ];
  public beneficiarySectionFields : any[]= [
    {
      type: 'text',
      name: 'rrrrrrr',
      label: 'Test',
      value: '',
      required: true,
    }
  ];
   public fields1: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'first1',
      label: 'URL',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'in', label: 'India' },
        { key: 'us', label: 'USA' }
      ]
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ]
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      required: true,
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' }
      ]
    }
  ];
 
  constructor(private resolver: ComponentFactoryResolver, private fb: FormBuilder,private http: HttpClient ,private jsonServiceService : JsonServiceService  ) {
   // alert("app constructor ");
   console.log("app constructor");
  }
 // async ngOnInit() {
   ngOnInit() {
    console.log("app ngOnInit1");
    // wait this.jsonServiceService.getPrice();
     console.log("app ngOnInit last");
     //this.addDynamic();
     /*$.ajax({
      url: currentPriceUrl,
      success: function(html) { 
       // alert("html"+html);
       console.log("app ngOnInit jquery result from server",html);
     
    
        console.log("modelData1");
       
        
       
    //console.log("modelData length" +this.fields.length );
      
      },
      async:false
    });*/
    console.log("app ngOnInit jquery last ");
  }
  ngOnInit1() { 
    //this.getContentJSON();
    console.log("app ngOnInit");
    //alert("app constructor  last");
    //console.log("test s:"+JSON.stringify(this.getContentJSON()));
    //console.log("test p:"+JSON.parse(this.getContentJSON()));
    //alert("test:"+JSON.stringify(this.getContentJSON())); 
    //alert("ngOnInit 2");
    // alert("ngOnInit 1");//this.setArrayInputs(this.arrayInputs);
    // (this.formName.get('controllerArray') as FormArray).push(this.fb.group({controlerInputName1:''}));    
   // alert("app c1 ");
     
  }
  addDynamic(){
    //alert("app c2 ");
    
    console.log("app ngAfterViewInit");

    
     //const currentPriceUrl = 'https://api.myjson.com/bins/m8phb';
     const currentPriceUrl = 'https://api.myjson.com/bins/lby0h';
     
     console.log("app ngOnInit jquery first");
     //let result =   $.get('https://api.myjson.com/bins/m8phb',);
     var result1 = $.ajax({
      type: "GET",
      url: currentPriceUrl,
      dataType: 'json',
      
      async: false
  });
  alert("app ngOnInit jquery result from server"+result1.responseJSON);
  for(let result of result1.responseJSON){
   
    //alert("result.section"+result.section);
      
    if(result.type =='text' || result.type =='textarea' || result.type =='datepicker' ){
    let modelData  = {
      type: result.type,
      name: result.name,
      label: result.label,
      value: result.value,
      required: result.required
   }; 
   if(result.section == 'Personal Information'){

   this.personalSectionFields.push(modelData);
   }else{
    this.beneficiarySectionFields.push(modelData);
   }
  }else{
    let masterDataArray =[];
    for(let result1 of result.options){
      let listValues  = {
        key: result1.key,
        label: result1.label
    }
    masterDataArray.push(listValues);
  }
   let modelDataWithList  = {
    type: result.type,
    name: result.name,
    label: result.label,
    value: result.value,
    required: result.required,
    options:masterDataArray
 }; 
 if(result.section == 'Personal Information'){

  this.personalSectionFields.push(modelDataWithList);
  }else{
   this.beneficiarySectionFields.push(modelDataWithList);
  }
  
} 
       
 /* let fieldsCtrls = {};
  for (let f of this.fields) {
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
  console.log("fieldsCtrls last",fieldsCtrls);  */
 // this.form = new FormGroup(fieldsCtrls);
 
    this.childComponentLoaded = true
// return this.fields;
   // this.form.touched;
   // this.form.markAsTouched;
    //this.form.updateValueAndValidity;
  }
}
  /*ngDoCheck(){
sdssd
  }
  ngAfterContentInit(){
    console.log()
  }*/
  addInput() {
   // (this.formName.get('controllerArray') as FormArray).push(this.fb.group({controlerInputName1:''}));
   //this.getContentJSON();
   //alert("test alert");
   console.log(this.form.value);
   }  

   getFields() {
   // alert("app getFields111 ");
    ////alert("getfields");
    //this.getContentJSON();
    
    //console.log("this.fields--qqqlength",this.fields.length);
    //return this.fields;
  }
  ngDistroy() {
    this.unsubcribe();
  }
  getContentJSON() {
    //return this.http.get('assets/form.json')
    //alert("====");
    //return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
    //.pipe(map((response: any) => response.body()));
    //.map(response => response.json()); 
  /*
     this.jsonServiceService.getResp().subscribe(
      data => {
         
        for(let result of data){
         
          if(result.type =='text' || result.type =='textarea' || result.type =='datepicker' ){
          let modelData  = {
            type: result.type,
            name: result.name,
            label: result.label,
            value: result.value,
            required: result.required
         }; 
         this.fields.push(modelData);
        }else{
          let masterDataArray =[];
          for(let result1 of result.options){
            let listValues  = {
              key: result.type,
              label: result.name
          }
          masterDataArray.push(listValues);
        }
         let modelDataWithList  = {
          type: result.type,
          name: result.name,
          label: result.label,
          value: result.value,
          required: result.required,
          options:masterDataArray
       }; 
       this.fields.push(modelDataWithList);
      }
      
          console.log("modelData");
         
          
       }
       console.log("modelData length" +this.fields.length );
        
   },
   error => {
      console.log(error);
   });
    
   console.log("modelData length return from server:" +this.fields.length );
   
 */
  }

  
 
  createComponent(message) {
    //this.entry.clear();
   // const factory = this.resolver.resolveComponentFactory(MessageComponent);
   this.addDynamic();
   const factory = this.resolver.resolveComponentFactory(DynamicFormBuilderComponent);
    const componentRef = this.entry.createComponent(factory);
    
    componentRef.instance.personalSectionFields = this.getpersonalInfoFields();
    componentRef.instance.beneficiarySectionFields = this.getBenInfoFields();
   // componentRef.instance.message = message;
}
getpersonalInfoFields(){
  return this.personalSectionFields;
}
getBenInfoFields(){
  return this.beneficiarySectionFields;
}
createDynaComponent(message) {
  alert('createDynaComponent:'+message);
  this.entry1.clear();
  alert('createDynaComponent1:'+message);
  const factory = this.resolver.resolveComponentFactory(DynamicFormBuilderComponent);
  alert('createDynaComponent2:'+message);
  const componentRef = this.entry1.createComponent(factory);
  alert('createDynaComponent3:'+message);
 // componentRef.instance.fields = this.getFields();;
  alert('createDynaComponent4:'+message);
}
destroyComponent() {
  this.componentRef.destroy();
}
}