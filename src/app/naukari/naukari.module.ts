import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NaukariComponent } from './naukari.component';
import { naukariRoutingModule } from './naukari-routing.module';
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    NaukariComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // <-- Add FormsModule for ngModel
    SharedModule,
    // settingRoutingModule,
    naukariRoutingModule,
    CKEditorModule, // <-- CKEditorModule should be imported here
    MatTableModule,
    NgxSpinnerModule,
    NgxJsonViewerModule,
    MatPaginatorModule,
    NgxPaginationModule,
    DataTablesModule, NgSelectModule
  ]
})
export class NaukariModule { }
