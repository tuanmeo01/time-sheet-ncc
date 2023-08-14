import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ProjectControlService } from "../project-control.service";
import { TeamMember } from "app/model/teamMember";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  @Input("row") public row: any;
  @Input("type") public type: any;

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
    { name: "Member", value: 0 },
    { name: "Shadow", value: 0 },
    { name: "DeActive", value: 0 },
  ];
  public selectedPosition = this.positionTask[0].value;
  public selectedPlan = this.selectPlan[0].name;
  public selectedStatus = [];
  public searchValue = "";
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public tempData = [];
  public formTeam: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _projectControl: ProjectControlService,
    private fb: FormBuilder
  ) {}
  public selectedRole = this.selectRole[0].name;
  public test: any;
  ngOnInit(): void {
    this.formTeam = this.fb.group({
      users: [[], Validators.required],
    });

    this._projectControl.getAllTeamMember().subscribe((res) => {
      this.listTeamMember = res.result;
      this.tempData = res.result;
    });
  }
  filterUpdate() {
    this.tempData = this.listTeamMember.filter(
      (client) =>
        client.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        client.emailAddress
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
    );
  }
  filterByRole(e) {
    e;
    if (e.value === "") {
      this.tempData = this.listTeamMember; // Nếu chọn "All", hiển thị tất cả
    } else {
      this.tempData = this.listTeamMember.filter(
        (client) => client.type === e.value
      );
    }
  }
  filterByPlan(e) {
    if (e.value === "") {
      this.tempData = this.listTeamMember; // Nếu chọn "All", hiển thị tất cả
    } else {
      this.tempData = this.listTeamMember.filter(
        (client) => client.branchDisplayName === e.value
      );
    }
  }
  filterByStatus(e) {}
  filterRows(roleFilter, planFilter, statusFilter) {}
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
    const modifiedData = selected.map((item, index) => {
      const { id } = item;
      const type = index === 0 ? 1 : item.type;
      return {
        userId: id,
        type: type,
      };
    });

    this.formTeam.patchValue({
      users: modifiedData,
    });
  }
}
