import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FindnumberComponent } from './findnumber.component';
import { FindnumberRoutingModule } from './findnumber-routing.module'

@NgModule({
  declarations: [
    FindnumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // <-- Add FormsModule for ngModel
    SharedModule,
    // settingRoutingModule,
    FindnumberRoutingModule,
    CKEditorModule, // <-- CKEditorModule should be imported here
    MatTableModule,
    NgxJsonViewerModule
  ]
})

export class FindnumberModule { }
