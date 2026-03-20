import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaukariSetupComponent } from './naukari-setup.component';
// import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: NaukariSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class naukariRoutingModule { }
