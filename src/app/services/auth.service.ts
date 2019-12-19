import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUserClaims } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<IUserClaims>;
  public currentUser: Observable<IUserClaims>;
  constructor(private http: HttpClient) {
    this.getUserContext1();
    this.currentUserSubject = new BehaviorSubject<IUserClaims>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUserClaims {
    return this.currentUserSubject.value;
  }

  async getUserContext1(): Promise<IUserClaims> {
    const userClaims = await this.getUserContext().toPromise();
    if (userClaims) {
      localStorage.setItem('currentUser', userClaims.FormDigestValue);
    }
    return userClaims;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error && error.error && error.error.message);
    } else {
      console.error(
        `Backend returned code ${error && error.status}, ` +
        `body was: ${error && error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getUserContext(): Observable<IUserClaims> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json;odata=verbose');
    const options = {
      headers: headers,
    };

    return this.http.post(environment.API_URL + '/contextinfo', options).pipe(
      map((data: IUserClaims) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }
}
