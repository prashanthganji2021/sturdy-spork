import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
   
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this if it's a web component

})
export class DashboardRoutingModule { }
