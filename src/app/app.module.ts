import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatTooltipModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatChipsModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonToggleModule,
} from '@angular/material';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from 'src/app/core/pipe/safePipe/safe.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { CoreModule } from './core/core.module';
// import { TeamViewComponent } from 'src/app/dashboard/cognizant-journey/team-view/team-view.component';
// import { FaqComponent } from 'src/app/dashboard/technical-info/faq/faq.component';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from 'src/app/core/graph/graph.component';
// import { RevenueComponent } from 'src/app/dashboard//governance/revenue/revenue.component';
// import { OffshoreLocationsComponent } from './dashboard/operations/offshore-locations/offshore-locations.component';
import { FileTextPipe } from './core/pipe/fileText/file-text.pipe';
import { GroupByPipe } from './core/pipe/groupByPipe/group-by.pipe';
import { ContactsComponent } from './contacts/contacts.component';
import { DiaryComponent } from './diary/diary.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { NgxPageScrollModule } from 'ngx-page-scroll';
// import { GlossaryComponent } from './dashboard/glossary/glossary.component';
import { DocumentComponent } from 'src/app/core/document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ModalComponent,
    HeaderComponent,
    SafePipe,
    FileTextPipe,
    // TeamViewComponent,
    // FaqComponent,
    // RevenueComponent,
    // OffshoreLocationsComponent,
    // GlossaryComponent,
    GraphComponent,
    ContactsComponent,
    DiaryComponent,
    GroupByPipe,
    DocumentComponent
  ],
  imports: [
    NgxPageScrollModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
    // PdfViewerModule,
    FormsModule,
    // CoreModule,
    FlexLayoutModule,
    HighchartsChartModule,
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDocViewerModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonToggleModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    GraphComponent,
    ContactsComponent,
    // TeamViewComponent,
    // RevenueComponent,
    // OffshoreLocationsComponent
  ],
  providers: [
    GroupByPipe
  ]
})
export class AppModule { }
