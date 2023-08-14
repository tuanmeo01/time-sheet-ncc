import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectService } from "../project.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { FlatpickrOptions } from "ng2-flatpickr";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["./view-project.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewProjectComponent implements OnInit {
  @Input("modal") public modal2: NgbActiveModal;
  @Input("title") public title: string;
  @Input("row") public row: any;
  public kitchenSinkRows: any;
  public kitchenSinkRows2: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public DateRangeOptions2: FlatpickrOptions = {
    altInput: true,
    mode: "range",
    altFormat: "d/m/Y ",
  };
  public formViewProject: FormGroup;

  constructor(private _project: ProjectService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formViewProject = this.fb.group({
      projectId: [this.row.id],
      startDate: ["2023-08-14"],
      endDate: ["2023-08-20"],
    });

    this.getTimeSheetProject();
    this.getTimeSheetTeam();
  }
  getTimeSheetProject() {
    this._project.getTimeSheetProject(this.formViewProject).subscribe((res) => {
      this.kitchenSinkRows = res.result;
    });
  }
  getTimeSheetTeam() {
    this._project.getTimeSheetTeam(this.formViewProject).subscribe((res) => {
      this.kitchenSinkRows2 = res.result;
    });
  }
  changeDate(e) {
    const selectedDate = e.target.value;
    const dateParts = selectedDate.split(" to ");
    this.formViewProject.patchValue({
      startDate: dateParts[0],
      endDate: dateParts[1],
    });

    this.getTimeSheetProject();
    this.getTimeSheetTeam();
  }
}
