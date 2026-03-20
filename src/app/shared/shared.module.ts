// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgToastModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NgToastModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule { }
