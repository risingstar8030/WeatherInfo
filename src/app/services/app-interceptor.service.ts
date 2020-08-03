import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwt = localStorage.getItem('token');

        const updatedRequest = request.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${jwt}`
            })
        });

        //console.log('Intercepted HTTP call', updatedRequest);

        return next.handle(updatedRequest)

            .pipe(

                catchError((error: HttpErrorResponse) => {

                    let errorMessage = '';

                    if (error.error instanceof ErrorEvent) {

                        // client-side error

                        errorMessage = `Error: ${error.error.message}`;

                    } else {

                        // server-side error

                        errorMessage = `Error : ${error.message}`;

                    }

                    return throwError(errorMessage);

                })

            )

    }

}
