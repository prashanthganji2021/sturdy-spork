import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Add this line
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { settingRoutingModule } from './settings-routing.module';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; // CKEditorModule is here

@NgModule({
  declarations: [
    SettingsComponent,  // <-- Make sure you declare your SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // <-- Add FormsModule for ngModel
    SharedModule,
    settingRoutingModule,
    CKEditorModule // <-- CKEditorModule should be imported here
  ]
})
export class SettingsModule { }
