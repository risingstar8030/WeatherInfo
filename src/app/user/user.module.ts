import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule , Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/UserModule/home/home.component';
import { CitiesListComponent } from './components/UserModule/cities-list/cities-list.component';
import { SearchCityComponent } from './components/UserModule/search-city/search-city.component';
import { NavbarComponent } from './components/UserModule/navbar/navbar.component';
import { SearchHistoryComponent } from './components/UserModule/search-history/search-history.component';


@NgModule({
  declarations: [HomeComponent, CitiesListComponent, SearchCityComponent, NavbarComponent, SearchHistoryComponent],
  imports: [
    CommonModule,RouterModule,FormsModule,Ng2SearchPipeModule,
    UserRoutingModule,NgxPaginationModule,
  ]
})
export class UserModule { }
