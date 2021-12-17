import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
