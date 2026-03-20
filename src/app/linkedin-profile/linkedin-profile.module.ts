import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedinProfileComponent } from './linkedin-profile.component'; // Import the component
import { LinkedinProfileComponentRoutes } from './linkedin-profile-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    LinkedinProfileComponent // <-- Add the component here
  ],
  imports: [
    CommonModule,
    LinkedinProfileComponentRoutes,
    FormsModule,  // <-- This is already included for ngModel
    SharedModule,
    CKEditorModule,
    MatTableModule,
    NgxSpinnerModule,
    NgxJsonViewerModule,
    MatPaginatorModule,
    NgxPaginationModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class LinkedinProfileModule { }
