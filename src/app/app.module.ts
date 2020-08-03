import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppInterceptorService} from './services/app-interceptor.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,RouterModule,FormsModule,BrowserAnimationsModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AppInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
