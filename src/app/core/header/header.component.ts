import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserProfile } from 'src/app/model/userProfile';
import { ContactsComponent } from 'src/app/contacts/contacts.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'FNZine';
  baseUrl = environment.BASE_URL;
  fnzUrl = environment.FNZ_URL;
  ctsUrl = environment.CTS_URL;
  userProfiles: IUserProfile[];
  constructor(public dialog: MatDialog) {
    this.userProfiles = [{
      Id: 111968,
      Designation: 'Director',
      Email: 'suganya.subbaraman@cognizant.com',
      Name: 'Suganya Subbaraman',
    },
    {
      Id: 690991,
      Designation: 'Sr. Director',
      Email: 'Mark.Summers@cognizant.com',
      Name: 'Mark Summers',
    },
    {
      Id: 374587,
      Designation: 'Assistant Vice President',
      Email: 'Faisal.Aziz@cognizant.com',
      Name: 'Faisal Aziz',
    }
    ] as IUserProfile[];
    this.userProfiles.map(c => { c.ProfileImageUrl = this.getImageUrl(c.Email) });
  }

  onContactSelection() {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '60%',
      data: this.userProfiles
    });
  }

  getImageUrl(email: string): string {
    return `${environment.BASE_URL}/_layouts/15/userphoto.aspx?size=L&username=${email}`;
  }
}
