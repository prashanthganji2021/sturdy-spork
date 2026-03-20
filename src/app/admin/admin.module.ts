import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponentComponent } from '../layout-component/layout-component.component';
import { HeaderComponent } from '../shared/header/header.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataTablesModule } from 'angular-datatables';
import { NgToastModule } from 'ng-angular-popup'; // Added NgToastModule

@NgModule({
  declarations: [
    LayoutComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    CKEditorModule, // Added CKEditorModule
    DataTablesModule, // Added DataTablesModule
    FormsModule, // Added FormsModule
    NgToastModule // Added NgToastModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, // Added CUSTOM_ELEMENTS_SCHEMA
    NO_ERRORS_SCHEMA // Added NO_ERRORS_SCHEMA
  ]
})
export class AdminModule { }
