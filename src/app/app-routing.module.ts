import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/authentication-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./components/main-page/main-page.module').then(module => module.MainPageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then(module => module.LoginModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
