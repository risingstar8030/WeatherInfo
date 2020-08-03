import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Observable, interval } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCitiesWeather() : Observable<any> {

    return this.http.get<any>('http://localhost:3000/user/getCitiesWeather')
       
  }

  listOfCities() : Observable<any> {

    return this.http.get<any>('http://localhost:3000/user/getCities')
  }

  weatherInfo(city: String) : Observable<any>{

    return this.http.get<any>('http://localhost:3000/user/weatherInfo/' + city)

  }

  getHistory(): Observable<any> {

    return this.http.get<any>('http://localhost:3000/user/getHistory')
  }

  deleteCity(city: String) {

    return this.http.delete<Object>('http://localhost:3000/user/deleteCity/' + city)
  }

  deleteHistory() {

    return this.http.delete<Object>('http://localhost:3000/user/deleteHistory')
  }

}
