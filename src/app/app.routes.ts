// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   path: 'users',
  //   loadComponent: () => import('./views/pages/register/register.component').then( m => m.RegisterComponent),
  //   data: {
  //     title: 'Users Page'
  //   },
  //   canActivate: [AuthGuard] ,

  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {
  //   path: 'reports/:id',
  //   loadComponent: () => import('./views/notifications/alerts/alerts.component').then(m => m.AlertsComponent),

  // },
  // {
  //   path: 'template',
  //   // loadChildren: () => import('./views/template-creation/template-creation.module').then(m => m.TemplateCreationModule),
  //   loadComponent: () => import('./views/template-creation/template-creation.component').then(m => m.TemplateCreationComponent),
  // },
  { path: '404', loadChildren: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
  { path: '**', redirectTo: 'dashboard' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
