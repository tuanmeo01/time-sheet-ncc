import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleCommonComponentComponent } from './common/components/example-common-component/example-common-component.component';
import { ExamplePipePipe } from './common/pipe/example-pipe.pipe';
import { ExampleDirectiveDirective } from './common/directives/example-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExampleCommonComponentComponent,
    ExamplePipePipe,
    ExampleDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
