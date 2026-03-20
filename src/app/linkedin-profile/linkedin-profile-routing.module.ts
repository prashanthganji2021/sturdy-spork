import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkedinProfileComponent } from './linkedin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LinkedinProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkedinProfileComponentRoutes { }
