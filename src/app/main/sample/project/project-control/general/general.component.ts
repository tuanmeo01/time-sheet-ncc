import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "app/model/client";
import { FlatpickrOptions } from "ng2-flatpickr";
import { ProjectControlService } from "../project-control.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  @Input("row") public row: any;

  public listClient: Client[];
  public formGeneral: FormGroup;
  constructor(
    private _projectControl: ProjectControlService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}
  public DateRangeOptions: FlatpickrOptions = {
    altInput: true,
    mode: "range",
    altFormat: "d/m/Y ",
  };
  public listProjectType = [
    { name: "Time & Materials", value: 2 },
    { name: "Fixed Fee", value: 1 },
    { name: "Non-Billable", value: 3 },
    { name: "ODC", value: 4 },
    { name: "Product", value: 5 },
    { name: "Training", value: 6 },
  ];
  public defaultProjectType = this.listProjectType[1].value;

  ngOnInit(): void {
    this.formGeneral = this.fb.group({
      customerId: ["", Validators.required],
      name: ["", Validators.required],
      code: ["", Validators.required],
      timeEnd: ["", Validators.required],
      timeStart: ["", Validators.required],
      note: [""],
      projectType: ["", Validators.required],
    });
    this.formGeneral.patchValue({
      ...this.row,
    });
    this._projectControl.getAllClient().subscribe((res) => {
      this.listClient = res.result;
    });
  }

  changeClient(e) {}
  changeProjectType(e) {}
  formatDate(date: string) {
    return this.datePipe.transform(date, "yyyy-MM-ddTHH:mm:ss.SSSZ");
  }
  onSubmit() {}
  changeDate(e) {
    const selectedDate = e.target.value;
    const dateParts = selectedDate.split(" to ");
    this.formGeneral.patchValue({
      timeStart: dateParts[0],
      timeEnd: dateParts[1],
    });
  }
  ngOnDestroy() {}
}
