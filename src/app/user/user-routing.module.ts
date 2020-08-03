import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/UserModule/home/home.component';
import { SearchCityComponent } from './components/UserModule/search-city/search-city.component';
import { SearchHistoryComponent } from './components/UserModule/search-history/search-history.component';
import { CitiesListComponent } from './components/UserModule/cities-list/cities-list.component';


const routes: Routes = [
  {path : '', component: HomeComponent,
  children : [
    {path: '', component: CitiesListComponent},
    {path:'search',component:SearchCityComponent},
    {path:'history',component : SearchHistoryComponent}
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
