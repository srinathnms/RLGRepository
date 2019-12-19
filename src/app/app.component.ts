import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'RLGRepository';
  formDigestDetail;

  constructor(public http: HttpClient) {
  }

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    let option = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };
    var item = {
      "__metadata": { "type": 'SP.Data.DashboardMenusListItem' },
      "MenuName": "TestRLG",
    };

    var queryUrl = "https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/web/lists/getbytitle('DashboardMenus')/items(" + 70 + ")/AttachmentFiles/add(FileName='" +fileToUpload.name+ "')";  
    let apiURL = `https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/lists/getbytitle('DashboardMenus')/items`;
    let methodType = "POST";

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/contextinfo";
    this.http.post(siteUrl, option).subscribe((response: Response) => {
      this.formDigestDetail = response;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json;odata=verbose',
        "X-HTTP-Method": methodType,
        "If-Match": "*",
        "X-RequestDigest": this.formDigestDetail.FormDigestValue
      });
      let options = {
        headers: httpHeaders
      };
      return this.http.post<any>(queryUrl , fileToUpload, options).subscribe(
        (response: Response) => {
          return response;
        },
        error => {
          console.log(error);
        });
    });
  }

  addNewCard() {
    let listName = "DashboardMenus";
    // var itemType = this.getItemTypeForListName(listName);
    let option = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };
    var item = {
      "__metadata": { "type": 'SP.Data.DashboardMenusListItem' },
      "MenuName": "TestRLG",
    };

    let apiURL = `https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/lists/getbytitle('DashboardMenus')/items`;
    let methodType = "POST";

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/RLG-Repository/_api/contextinfo";
    this.http.post(siteUrl, option).subscribe((response: Response) => {
      this.formDigestDetail = response;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json;odata=verbose',
        "X-HTTP-Method": methodType,
        "If-Match": "*",
        "X-RequestDigest": this.formDigestDetail.FormDigestValue
      });
      let options = {
        headers: httpHeaders
      };
      return this.http.post<any>(apiURL, JSON.stringify(item), options).subscribe(
        (response: Response) => {
          return response;
        },
        error => {
          console.log(error);
        });
    });
  }
}
