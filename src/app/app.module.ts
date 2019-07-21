import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilderModule } from './dynamic-form-builder.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JsonServiceService } from './json-service.service';
import { MessageComponent } from './message.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
//import { DynamicPaymentFormComponent } from "./dynamicpayment/dynamicpayment.component";

@NgModule({
  declarations: [
    AppComponent,MessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    DynamicFormBuilderModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [JsonServiceService],
  bootstrap: [AppComponent],
  entryComponents: [DynamicFormBuilderComponent]
})
export class AppModule { }
