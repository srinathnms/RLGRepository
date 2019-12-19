import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/model/dashboard';
import { BaseService } from '../services/base.service';
import { AuthService } from '../services/auth.service';
import { SharepointList } from '../model/enum/sharepointList';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
  constructor(private http: HttpClient, authService: AuthService) {
    super(authService);
  }

  get(listName: string, query?: string): Observable<any> {
    let url = `${environment.API_URL}/lists/GetByTitle('${listName}')/items`;
    if (query) {
      url = `${environment.API_URL}/lists/GetByTitle('${listName}')/items${query}`;
    }
    return this.http.get<any>(url)
      .pipe(
        map((result: any) => result.value),
        retry(3),
        catchError(this.handleError)
      );
  }

  getAttachments(listName: string, query?: string): Observable<any> {
    const url = `${environment.API_URL}/lists/GetByTitle('${listName}')/items${query}`;
    return this.http.get<any>(url)
      .pipe(
        map((attachments: any) => {
          return attachments.value;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  getDocument(url: string): Observable<string> {
    return this.http.get<any>(url, { responseType: 'arraybuffer' as 'json' })
      .pipe(
        map((documentStream: any) => {
          const file = new Blob([documentStream], { type: 'application/pdf' });
          const fileUrl = URL.createObjectURL(file);
          return fileUrl;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  getTeamView(file: string): Observable<any> {
    return this.http.get<any>(file, { responseType: 'blob' as 'json' })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Dummy data to work in local : Should be deleted once ready to deploy
  getFromMock(listName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/${listName}`)
      .pipe(
        map((dashboardMenus: any) => dashboardMenus),
        retry(3),
        catchError(this.handleError)
      );
  }

  public getItemTypeForListName(name) {
    return 'SP.Data.' + name.charAt(0).toUpperCase() + name.slice(1) + 'ListItem';
  }

  put(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
    const listName = 'DashboardMenus';
    const itemType = this.getItemTypeForListName(listName);
    const formDigestValue = localStorage.getItem('currentUser');
    const item = {
      '__metadata': { 'type': 'SP.Data.DashboardMenusListItem' },
      'MenuName': dashboardMenu.MenuName,
      'ParentId': 1
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json;odata=verbose',
      'X-HTTP-Method': 'POST',
      'If-Match': '*',
      'X-RequestDigest': formDigestValue,
    });

    const options = {
      headers: httpHeaders,
    };

    const siteUrl = `${environment.API_URL}/lists/GetByTitle('${listName}')/items`;
    return this.http.post<IDashboardMenu[]>
      (siteUrl, JSON.stringify(item), options)
      .pipe(
        map((dashboardMenus: any) => dashboardMenus),
        retry(3),
        catchError(this.handleError)
      );
  }

  addMenu(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
    const option = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };
    const siteUrl = `${environment.API_URL}/contextinfo`;
    const listName = "DashboardMenus";
    const itemType = this.getItemTypeForListName(listName);

    const item = {
      "__metadata": { "type": itemType },
      "MenuName": dashboardMenu.MenuName,
    };

    const apiURL = `https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/lists/getbytitle('DashboardMenus')/items`;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json;odata=verbose',
      'X-HTTP-Method': 'POST',
      'If-Match': '*',
      'X-RequestDigest': localStorage.getItem('currentUser')
    });
    let options = {
      headers: httpHeaders
    };

    return this.http.post<any>(apiURL, JSON.stringify(item), options).
      pipe(
        map((dashboardMenus: any) => {
          return dashboardMenus;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  // fileUpload(file: File): Observable<any> {
  //   const listName = 'DashboardMenus';
  //   const itemType = this.getItemTypeForListName(listName);
  //   const formDigestValue = localStorage.getItem('currentUser');
  //   const fileBlob = new Blob([file], { type: 'application/pdf' });
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
  //     'Cache-Control': 'no-cache',
  //     'Accept': 'application/json;odata=verbose',
  //     'X-HTTP-Method': 'POST',
  //     'If-Match': '*',
  //     'X-RequestDigest': formDigestValue
  //   });

  //   const options = {
  //     headers: httpHeaders,
  //   };
  //   const siteUrl = `${environment.API_URL}/lists/GetByTitle('${listName}')/items`;
  //   const item = {
  //     '__metadata': { 'type': 'SP.Data.DashboardMenusListItem' },
  //     'MenuName': "Test"
  //   };
  //   return this.http.post<any>
  //     (siteUrl, JSON.stringify(item), options)
  //     .pipe(
  //       map((dashboardMenus: any) => {
  //         return dashboardMenus;
  //       }),
  //       retry(3),
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
