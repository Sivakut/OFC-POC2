import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import {  Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: "app-dynamicpayment",
  templateUrl: "./dynamicpayment.component.html",
  styleUrls: ["./dynamicpayment.component.css"]
})
export class DynamicPaymentFormComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
   errorMsg = new Map();

    personalSectionFields: any[] = [];
   beneficiarySectionFields: any[]= [];

    title: string;
    errorMsgArr: any[]= [];
  constructor(private fb: FormBuilder) {}

  logToConsole(object: any) {
    console.log(object);
  }
 
  ngOnInit() {
    //var m = str.match(/^\d{0,2}(?:\.\d{0,2}){0,1}$/);
  
//Set entries
 
    console.log("title:",this.title);
    this.form = this.fb.group({
      paymentInfo_details: this.fb.group({
        name:  ['', [Validators.maxLength(10),Validators.pattern(/^[1-9]\d*((\.\d{0,5})?)$/)]],
        founder: ""
      }),
      paymentInfoWithbeneficiariesList: this.fb.array([this.addPaymentInfoWithBeneficiary()])
    });
    (this.form.get("paymentInfoWithbeneficiariesList") as FormArray).removeAt(0);
  }


  
  validate(){
    console.log('validate');
   // (<FormGroup>this.form.controls['paymentInfo_details']).controls['name'].setValue("Test");
    (<FormGroup>this.form.controls['paymentInfo_details']).controls['name'].setValidators([ Validators.maxLength(10), Validators.minLength(6)]); 
    (<FormGroup>this.form.controls['paymentInfo_details']).controls['name'].updateValueAndValidity;
console.log('Errors',(<FormGroup>this.form.controls['paymentInfo_details']).controls['name'].errors);
(<FormGroup>this.form.controls['paymentInfo_details']).controls['name'].markAsTouched();
    //console.log('userIndex', userIndex, '-------', 'index', index);
    //(<FormArray>(<FormGroup>(<FormArray>this.form.controls['user'])
    //    .controls[userIndex]).controls['phones']).removeAt(index);
this.errorMsg.set("msg1", "Error Msg1");
this.errorMsg.set("0lastname", "Error Msg0");
this.errorMsg.set("msg3", "Error Msg3");
this.errorMsg.set("firstname", "Error Msg4");
this.errorMsg.set("16lastname", "Error Msg6");

  }
   addPaymentInfoWithBeneficiary(): FormGroup {

 //alert("dyna 1");
 




//this.form = new FormGroup(fieldsCtrls);
  //const persForm =new FormGroup(personalFormFieldsCtrls);
 
  //this.form =persForm;
 
    
    this.form1= this.fb.group({
      //team_name:[''],
      personalDtl: this.fb.array([this.addPaymentSection()]),
      //paymentSectionInfoArray: this.fb.array([this.addBeneficiary()])
      beneficiariesList: this.fb.array([this.addBeneficiary()])
    });
   
   
    console.log("personalFormFieldsCtrls contents:",this.form1);
  
     
return this.form1;
  }

  addPaymentSection(): FormGroup {
    
     
   let personalFormFieldsCtrls = {};
for (let f of this.personalSectionFields) {
  console.log("fieldsCtrls type",f.type);
  if (f.type != 'checkbox') {
    personalFormFieldsCtrls[f.name] =new FormControl(f.value || '', Validators.required);
  } else {
    let opts = {};
    for (let opt of f.options) {
      opts[opt.key] = new FormControl(f.value || '', Validators.required);
    }
    personalFormFieldsCtrls[f.name] = new FormGroup(opts) ;
  }
  //console.log("fieldsCtrls type",f.type);
  
}
 
    return new FormGroup(personalFormFieldsCtrls);
   /* return this.fb.group({
      team_name: [""]
    });  */
  }
   addBeneficiary(): FormGroup {
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
   
    return new FormGroup(fieldsCtrls);
   /* return this.fb.group({
      player_name: "",
      player_number: ""
    });*/
  }

  addPayment() {
    this.addDynamic();
    (this.form.get("paymentInfoWithbeneficiariesList") as FormArray).push(this.addPaymentInfoWithBeneficiary());
  }


  deletePayment(index) {
    (this.form.get("paymentInfoWithbeneficiariesList") as FormArray).removeAt(index);
  }

  addBeneficiaryInfo(team) {
    team.get("beneficiariesList").push(this.addBeneficiary());
  }

  deleteBeneficiaryInfo(team, index) {
    team.get("beneficiariesList").removeAt(index);
  }
  addDynamic(){
   // alert("app c2 ");
    
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
  //alert("app ngOnInit jquery result from server"+result1.responseJSON);
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
console.log("personalSectionFields",this.personalSectionFields);  
console.log("beneficiarySectionFields",this.beneficiarySectionFields);          
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
  
// return this.fields;
   // this.form.touched;
   // this.form.markAsTouched;
    //this.form.updateValueAndValidity;
  }
}
}
