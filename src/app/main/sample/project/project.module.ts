import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { NgxLoadingModule } from "ngx-loading";
import { GeneralComponent } from "./project-control/general/general.component";
import { NotificationComponent } from "./project-control/notification/notification.component";
import { ProjectControlComponent } from "./project-control/project-control.component";
import { TaskComponent } from "./project-control/task/task.component";
import { TeamComponent } from "./project-control/team/team.component";
import { ProjectComponent } from "./project.component";
import { ViewProjectComponent } from './view-project/view-project.component';

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
    ViewProjectComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    FormsModule,
    Ng2FlatpickrModule,
    CommonModule,
    NgxLoadingModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModalModule,
    CardSnippetModule,
    NgxDatatableModule,
    TranslateModule,
    CoreCommonModule,
    NgSelectModule,
  ],
  providers: [DatePipe],
  exports: [ProjectComponent],
})
export class ProjectModule {}
