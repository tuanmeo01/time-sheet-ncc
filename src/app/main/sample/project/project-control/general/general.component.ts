import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProjectControlService } from "../project-control.service";
import { Client } from "app/model/client";
import { FlatpickrOptions } from "ng2-flatpickr";
import Stepper from "bs-stepper";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  public listClient: Client[];
  constructor(private _projectControl: ProjectControlService) {}
  public DateRangeOptions: FlatpickrOptions = {
    altInput: true,
    mode: "range",
    altFormat: "d/m/Y ",
  };

  public listProjectType = [
    { name: "Time & Materials", value: 1 },
    { name: "Fixed Fee", value: 2 },
    { name: "Non-Billable", value: 3 },
    { name: "ODC", value: 4 },
    { name: "Product", value: 5 },
    { name: "Training", value: 6 },
  ];
  public defaultProjectType = this.listProjectType[1].value;

  ngOnInit(): void {
    this._projectControl.getAllClient().subscribe((res) => {
      this.listClient = res.result;
      console.log(this.listClient);
    });
  }

  changeClient(e) {}
  changeProjectType(e) {}
  ngOnDestroy() {
    console.log("day");
  }
}
