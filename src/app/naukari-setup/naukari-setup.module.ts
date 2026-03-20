import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaukariSetupComponent } from './naukari-setup.component';
import { naukariRoutingModule } from './naukari-setup-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { settingRoutingModule } from '../settings/settings-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    NaukariSetupComponent,
  ],
  imports: [
    CommonModule,
    naukariRoutingModule,
    FormsModule,  // <-- Add FormsModule for ngModel
    SharedModule,
    settingRoutingModule,
    CKEditorModule // <-- CKEditorModule should be imported here
  ]
})
export class NaukariSetupModule { }
