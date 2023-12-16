import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.log("header responce error, was not 200");
    return throwError(() => err);
  }

  getData(url: string, auth: boolean = false): Observable<any> {
    var url = url;
    var setHeaders: any;

    if (auth) {
      setHeaders = new HttpHeaders().set(
        "Authorization",
        'Bearer ' + ''
      );
    }

    return this.http.get(url, { headers: setHeaders, observe: 'response' })
      .pipe(map((data: any) => {
        //handle api 200 response code here or you wanted to manipulate to response
        return data;
      }),
        catchError(this.handleError)
      );
  }

  postData(url: string, auth: boolean = false, postData: object): Observable<any> {
    var url = url;
    var setHeaders: any;

    if (auth) {
      setHeaders = new HttpHeaders().set(
        "Authorization",
        'Bearer ' + ''
      );
    }

    return this.http.post(url, postData, { headers: setHeaders, observe: 'response' })
      .pipe(map((data: any) => {
        //handle api 200 response code here or you wanted to manipulate to response
        return data;
      }),
        catchError(this.handleError)
      );
  }

}
