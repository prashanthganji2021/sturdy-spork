// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConnectionServiceModule } from 'ng-connection-service';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routes';
import { AuthInterceptor } from './authInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataTablesModule} from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FindnumberComponent } from './findnumber/findnumber.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConnectionServiceModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    CommonModule,
    CKEditorModule,
    NgbModule,
    NgxSpinnerModule,
    MatPaginatorModule, // Add MatPaginatorModule here
    MatInputModule, // Add MatInputModule here
    FormsModule // Required for [(ngModel)] binding

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

