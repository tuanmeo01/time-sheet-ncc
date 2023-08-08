import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SampleComponent } from "./task.component";
import { AuthGuard } from "app/auth/helpers";

const routes = [
  {
    path: "",
    component: SampleComponent,
    data: { animation: "datatables" },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CardSnippetModule,
    NgxDatatableModule,
    TranslateModule,
    CoreCommonModule,
    NgSelectModule,
  ],
  providers: [],
  exports: [],
})
export class TaskModule {}
