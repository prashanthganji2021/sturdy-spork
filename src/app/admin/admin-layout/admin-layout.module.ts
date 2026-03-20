import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    // DataTableDirective // Ensure DataTableDirective is declared here
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminLayoutRoutingModule,
    
  ]
})
export class AdminLayoutModule { }
