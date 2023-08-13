import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../project.service";
import { Task } from "app/model/task";
import { ProjectControlService } from "../project-control.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  public listTaskCommon: Task[] = []; // type =1
  public listTaskOther: Task[] = []; // type=0
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 5;
  public SelectionType = SelectionType;
  public chkBoxSelected = [];
  public allRowsSelected = false;
  constructor(private _projectService: ProjectControlService) {}

  ngOnInit(): void {
    this._projectService.getAllTask().subscribe((res) => {
      res.result.map((item) => {
        if (item.type === 1) {
          this.listTaskCommon.push(item);
        } else {
          this.listTaskOther.push(item);
        }
      });
      console.log(this.listTaskCommon, this.listTaskOther);
    });
  }
  customChkboxOnSelect(e) {}
  deleteTask(e) {
    this.listTaskOther = this.listTaskOther.filter((obj) => obj !== e);
    this.listTaskCommon = [...this.listTaskCommon, e];
  }
  addTask(e) {
    this.listTaskCommon = this.listTaskCommon.filter((obj) => obj !== e);
    this.listTaskOther = [...this.listTaskOther, e];
  }
}
