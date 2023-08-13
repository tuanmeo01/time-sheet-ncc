import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProjectControlComponent } from "./project-control/project-control.component";
import { ProjectComponent } from "./project.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { GeneralComponent } from "./project-control/general/general.component";
import { TeamComponent } from "./project-control/team/team.component";
import { TaskComponent } from "./project-control/task/task.component";
import { NotificationComponent } from "./project-control/notification/notification.component";
import { Ng2FlatpickrModule } from "ng2-flatpickr";

const routes = [
  {
    path: "",
    component: ProjectComponent,
    data: { animation: "datatables" },
  },
];

@NgModule({
  declarations: [
    ProjectControlComponent,
    ProjectComponent,
    GeneralComponent,
    TeamComponent,
    TaskComponent,
    NotificationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    FormsModule,
    Ng2FlatpickrModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModalModule,
    CardSnippetModule,
    NgxDatatableModule,
    TranslateModule,
    CoreCommonModule,
    NgSelectModule,
  ],
  providers: [],
  exports: [ProjectComponent],
})
export class ProjectModule {}
