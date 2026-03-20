import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { LayoutComponentComponent } from 'src/app/layout-component/layout-component.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponentComponent,
    children: [
     { path: '', redirectTo: 'dashboard', pathMatch: 'full'
     },


      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),

      },

       { path: 'settings',
        loadChildren: () => import('./../../settings/settings.module').then(m => m.SettingsModule) },
        {
          path: 'naukari',
          loadChildren: () => import('./../../naukari/naukari.module').then(m => m.NaukariModule)
        },
        {
          path: 'find_numbers',
          loadChildren: () => import('./../../findnumber/findnumber.module').then(m => m.FindnumberModule)
        },
        {
          // LinkedinProfileComponent
          path: 'linkedin-profile',
          loadChildren: () => import('./../../linkedin-profile/linkedin-profile.module').then(m => m.LinkedinProfileModule)
        }, 
        {
          path : 'naukari-setup',
          loadChildren: () => import('./../../naukari-setup/naukari-setup.module').then(m => m.NaukariSetupModule)
        }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
