import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenRoutingModule } from './authen-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [CommonModule, AuthenRoutingModule],
})
export class AuthenModule {}
