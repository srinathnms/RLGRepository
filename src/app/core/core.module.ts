import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafePipe } from './pipe/safePipe/safe.pipe';
import { GraphComponent } from './graph/graph.component';
import { FileTextPipe } from './pipe/fileText/file-text.pipe';
import { ContactsComponent } from '../contacts/contacts.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
    ],
    entryComponents: [
        ContactsComponent
    ],
    providers: [
    ]
})
export class CoreModule { }
