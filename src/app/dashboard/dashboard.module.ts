import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

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
    MatRadioModule
} from '@angular/material';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './index/dashboard.component';

const routers: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ],
    imports: [
        FlexLayoutModule,
        HighchartsChartModule,
        CommonModule,
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
        MatRadioModule,
        RouterModule.forChild(routers)
    ],
    entryComponents: [
      ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // Other providers suppressed
      ],
})
export class DashboardModule { }
