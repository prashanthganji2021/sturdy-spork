import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaukariComponent } from './naukari.component';

const routes: Routes = [
  {
    path: '',
    component: NaukariComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class naukariRoutingModule { }
