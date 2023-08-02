import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AuthGuard } from "app/auth/helpers";
import { HomeComponent } from "./home/home.component";

import { SampleComponent } from "./task/sample.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { TimeSheetService } from "./time-sheet.service";
import { AddTaskComponent } from "./task/add-task/add-task.component";
import { EditTaskComponent } from "./task/edit-task/edit-task.component";
import { NgSelectModule } from "@ng-select/ng-select";

const routes = [
  {
    path: "task",
    component: SampleComponent,
    data: { animation: "datatables" },
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    SampleComponent,
    HomeComponent,
    AddTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    NgbModule,
    CardSnippetModule,
    NgxDatatableModule,
    TranslateModule,
    CoreCommonModule,
    NgSelectModule,
  ],
  providers: [TimeSheetService],
  exports: [SampleComponent, HomeComponent],
})
export class SampleModule {}
