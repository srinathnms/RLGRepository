import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUserProfile } from '../model/userProfile';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  constructor(public dialogRef: MatDialogRef<ContactsComponent>, @Inject(MAT_DIALOG_DATA) public userProfiles: IUserProfile[]) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
