import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AuthGuard } from "app/auth/helpers";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { HomeComponent } from "./home/home.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { AddTaskComponent } from "./task/task-control/task-control.component";
import { SampleComponent } from "./task/task.component";
import { TimeSheetService } from "./time-sheet.service";
import { ProjectComponent } from "./project/project.component";

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
  {
    path: "project",
    component: ProjectComponent,
    data: { animation: "project" },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    SampleComponent,
    HomeComponent,
    AddTaskComponent,
    ProjectComponent,
  ],
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
  providers: [TimeSheetService],
  exports: [SampleComponent, HomeComponent],
})
export class SampleModule {}
