import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';
import { IDocument } from 'src/app/model/document';
import { IModalDialog } from 'src/app/model/modal-dialog';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @Input() data: IModalDialog;
  documents: IDocument[];
  selectedAttachment: IDocument;
  documentNames: string[];
  selectedDocumentName: string;
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.documents = this.data && this.data.content as IDocument[];
    if (this.documents && this.documents.length > 0) {
      this.documentNames = this.documents.map(x => x.FileName);
      this.selectedDocumentName = this.documentNames[0];
      this.onDocumentTypeChange(this.selectedDocumentName);
    }
  }

  onDocumentTypeChange(documentName: string): void {
    const selectedDocument = this.documents.filter(document => document.FileName === documentName);
    if (selectedDocument && selectedDocument.length > 0) {
      this.selectedAttachment = selectedDocument[0];
      const documentUrl = `${environment.SHARE_POINT_URL}${this.selectedAttachment.ServerRelativeUrl}`;
      this.dashboardService.getDocument(documentUrl).subscribe((fileUrl: string) => {
        this.selectedAttachment.ServerRelativeUrl = fileUrl;
      });
    }
  }
}