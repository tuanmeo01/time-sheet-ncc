import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectControlService } from "../project-control.service";
import { TeamMember } from "app/model/teamMember";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";
  public listTeamMember: TeamMember[];
  public selectRole: any = [
    { name: "All", value: "" },
    { name: "Staff", value: 0 },
    { name: "Internship", value: 1 },
    { name: "Collaborator", value: 2 },
  ];
  public selectPlan: any = [
    { name: "All", value: "" },
    { name: "Sài Gòn 1", value: "Sài Gòn 1" },
    { name: "Hà Nội", value: "Hà Nội 1" },
    { name: "Hà Nội 2", value: "Hà Nội 2" },
    { name: "Kom Tum", value: "Kom Tum" },
    { name: "Hà Nộis", value: "Hà Nộis" },
    { name: "SGVSRg", value: "SGVSRg" },
    { name: "[Redacted]", value: "[Redacted]" },
  ];
  public positionTask: any = [
    { name: "Project Manager", value: 1 },
    { name: "Member", value: 1 },
    { name: "Shadow", value: 1 },
    { name: "DeActive", value: 1 },
  ];
  public selectedPosition = this.positionTask[0].value;
  public selectedPlan = this.selectPlan[0].name;
  public selectedStatus = [];
  public searchValue = "";
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public tempData = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _projectControl: ProjectControlService) {}
  public selectedRole = this.selectRole[0].name;
  ngOnInit(): void {
    this._projectControl.getAllTeamMember().subscribe((res) => {
      this.listTeamMember = res.result;
      this.tempData = res.result;
      console.log("temp", this.tempData);
    });
  }
  filterUpdate() {
    console.log(this.searchValue);

    this.tempData = this.listTeamMember.filter(
      (client) =>
        client.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        client.emailAddress
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
    );
  }
  filterByRole(e) {
    console.log(e);
    if (e.value === "") {
      this.tempData = this.listTeamMember; // Nếu chọn "All", hiển thị tất cả
    } else {
      this.tempData = this.listTeamMember.filter(
        (client) => client.type === e.value
      );
      console.log(this.tempData);
    }
  }
  filterByPlan(e) {
    if (e.value === "") {
      this.tempData = this.listTeamMember; // Nếu chọn "All", hiển thị tất cả
    } else {
      this.tempData = this.listTeamMember.filter(
        (client) => client.branchDisplayName === e.value
      );
      console.log(this.tempData);
    }
  }
  filterByStatus(e) {
    console.log(e);
  }
  filterRows(roleFilter, planFilter, statusFilter) {}
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }
}
