import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Observable, interval } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  register(user): Observable<any> {

    return this.http.post<any>('http://localhost:3000/auth/register', user)
  }

  login(user) : Observable<any> {
    console.log(user)
    return this.http.post<any>('http://localhost:3000/auth/login', user)
  
  }

  isLoggedIn(){

    return !!localStorage.getItem('token')
  }

}
