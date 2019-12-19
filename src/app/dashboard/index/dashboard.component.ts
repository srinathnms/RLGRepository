import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger, state } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDashboardMenu } from 'src/app/model/dashboard';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { DashboardService } from '../dashboard.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { environment } from 'src/environments/environment';
import { IDocument } from '../../model/document';
import { IFinance } from 'src/app/model/finance';
import { IGlossary } from 'src/app/model/glossary';
import { IFaq } from 'src/app/model/faq';
import { MenuContentTypes } from 'src/app/model/enum/menuContentTypes';
import { SharepointList } from 'src/app/model/enum/sharepointList';
import { FlipState } from 'src/app/model/enum/flipState';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(300, animateChild())
        ),
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('0.20s', animate('0.20s ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])
    ]),
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})

export class DashboardComponent implements OnInit {
  finance: IFinance[];
  graphContent: Highcharts.SeriesOptionsType[];
  selectedMenu: IDashboardMenu;
  selectedSubMenuId: number;
  dashboardMainMenus: IDashboardMenu[];
  dashboardMenus: IDashboardMenu[];
  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.dashboardService.get('DashboardMenus')
      .subscribe((data: IDashboardMenu[]) => {
        this.dashboardMenus = data;
        this.dashboardMenus.map(c => { c.Flip = FlipState.Inactive; });
        this.dashboardMainMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === 0);
      });
  }

  ngOnInit(): void {
  }

  onMenuClick(dashboardMenu: IDashboardMenu): void {
    if (this.selectedMenu) {
      this.dashboardMenus.map(c => { c.Flip = FlipState.Inactive; });
      this.selectedMenu = dashboardMenu;
      this.toggleFlip(dashboardMenu);
      return;
    }
    this.selectedMenu = dashboardMenu;
    this.toggleFlip(this.selectedMenu);
  }

  toggleFlip(dashboardMenu: IDashboardMenu) {
    const selectedMenu = this.dashboardMenus.filter(c => c.Id === dashboardMenu.Id)[0];
    if (selectedMenu.Flip === FlipState.Inactive) {
      selectedMenu.Flip = FlipState.Active;
      return;
    }
    selectedMenu.Flip = FlipState.Inactive;
  }

  onSubMenuHover(dashboardSubMenu: IDashboardMenu): void {
    if (this.selectedSubMenuId === dashboardSubMenu.Id) {
      this.selectedSubMenuId = null;
      return;
    }
    this.selectedSubMenuId = dashboardSubMenu.Id;
  }

  onSubMenuClick(dashboardSubMenu: IDashboardMenu): void {
    const modalDialogData = {
      header: dashboardSubMenu.MenuName,
      footer: 'Close',
    } as IModalDialog;
    if (dashboardSubMenu.MenuContentType === MenuContentTypes.Document || dashboardSubMenu.MenuContentType === MenuContentTypes.MultipleDocuments) {
      const attachmentQuery = `(${dashboardSubMenu.Id})/AttachmentFiles`;
      this.dashboardService.getAttachments(SharepointList.DashboardMenus, attachmentQuery)
        .subscribe((documents: IDocument[]) => {
          modalDialogData.content = documents;
          modalDialogData.menuContentType = MenuContentTypes[dashboardSubMenu.MenuContentType];
          this.openDialog(modalDialogData);
        });
      return;
    }
    if (dashboardSubMenu.MenuContentType === MenuContentTypes.Graph) {
      this.dashboardService.get(SharepointList.FinanceChart)
        .subscribe((data: IFinance[]) => {
          modalDialogData.content = data;
          modalDialogData.menuContentType = MenuContentTypes.Graph;
          this.openDialog(modalDialogData);
        });
      return;
    }
    if (dashboardSubMenu.MenuContentType === MenuContentTypes.Location) {
      const attachmentQuery = `(${dashboardSubMenu.Id})/AttachmentFiles`;
      this.dashboardService.getAttachments('DashboardMenus', attachmentQuery)
        .subscribe((documents: IDocument[]) => {
          modalDialogData.content = documents;
          modalDialogData.menuContentType = MenuContentTypes.Location;
          this.openDialog(modalDialogData);
        });
      return;
    }
    if (dashboardSubMenu.MenuContentType === MenuContentTypes.Glossary) {
      const glossaryQuery = '?$top=150';
      this.dashboardService.get(SharepointList.Glossary, glossaryQuery)
        .subscribe((data: IGlossary[]) => {
          data.map((glossary: IGlossary) => {
            glossary.ElementId = glossary.Terms.replace(/\s/g, '');
          });
          modalDialogData.content = data;
          modalDialogData.menuContentType = MenuContentTypes.Glossary;
          this.openDialog(modalDialogData);
        });
      return;
    }
    if (dashboardSubMenu.MenuContentType === MenuContentTypes.FAQ) {
      this.dashboardService.get(SharepointList.FAQ)
        .subscribe((data: IFaq[]) => {
          data.map((faq: IFaq) => {
            const attachmentQuery = `(${faq.Id})/AttachmentFiles`;
            if (faq && faq.Attachments) {
              this.dashboardService.getAttachments(SharepointList.FAQ, attachmentQuery)
                .subscribe((document: IDocument[]) => {
                  faq.AttachmentName = document[0].FileName;
                  faq.AttachmentUrl = `${environment.SHARE_POINT_URL}${document[0].ServerRelativeUrl}?web=1`;
                });
            }
          });
          modalDialogData.content = data;
          modalDialogData.menuContentType = MenuContentTypes.FAQ;
          this.openDialog(modalDialogData);
        });
      return;
    }
    modalDialogData.menuId = dashboardSubMenu.Id;
    modalDialogData.content = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === dashboardSubMenu.Id);
    if (modalDialogData.content && modalDialogData.content.length > 0) {
      modalDialogData.content.map(x => {
        const attachmentQuery = `(${x.Id})/AttachmentFiles`;
        this.dashboardService.getAttachments('DashboardMenus', attachmentQuery)
          .subscribe((documents: IDocument[]) => {
            x.DocumentUrls = documents.map(document => { return document.ServerRelativeUrl });
          });
      });
    }
    this.openDialog(modalDialogData);
  }

  getSubMenus(dashboardMenu: IDashboardMenu): IDashboardMenu[] {
    const subMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === dashboardMenu.Id);
    return subMenus;
  }

  openDialog(modalDialogData: IModalDialog): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '91%',
      width: '90%',
      minHeight: '600px',
      data: modalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedSubMenuId = null;
    });
  }

  onMenuAdd(): void {
    const dashboardMenu = { MenuName: "Test" } as IDashboardMenu;
    this.dashboardService.addMenu(dashboardMenu).subscribe();
  }

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    // this.dashboardService.fileUpload(fileToUpload).subscribe((test: any) => {
    //   const data = test;
    // });
  }

  onMenuRemove(dashboardMenu: IDashboardMenu) {
    // this.dashboardService.delete(dashboardMenu.id).subscribe();
  }
}
