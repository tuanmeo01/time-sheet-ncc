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

const routes = [
  {
    path: "task",
    loadChildren: () => import("./task/task.module").then((m) => m.TaskModule),
    canActive: [AuthGuard],
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    canActive: [AuthGuard],
  },
  {
    path: "project",
    loadChildren: () =>
      import("./project/project.module").then((m) => m.ProjectModule),
    canActive: [AuthGuard],
  },
];

@NgModule({
  declarations: [SampleComponent, HomeComponent, AddTaskComponent],
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
export class AppsModule {}
