import { HomePageComponent } from 'src/app/modules/authen/pages/home-page/home-page.component';
import { LoginPageComponent } from 'src/app/modules/authen/pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenRoutingModule {}
