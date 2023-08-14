import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from "../../project.service";
import { Task } from "app/model/task";
import { ProjectControlService } from "../project-control.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  @Input("row") public row: any;

  public listTaskCommon: Task[] = []; // type =1
  public listTaskOther: Task[] = []; // type=0
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 5;
  public SelectionType = SelectionType;
  public chkBoxSelected = [];
  public allRowsSelected = false;
  public newArray: any;
  public formTask: FormGroup;
  constructor(
    private _projectService: ProjectControlService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formTask = this.fb.group({
      tasks: [[]],
    });
    this.formTask.patchValue({
      ...this.row,
    });
    this._projectService.getAllTask().subscribe((res) => {
      res.result.map((item) => {
        if (item.type === 1) {
          this.listTaskCommon.push(item);
        } else {
          this.listTaskOther.push(item);
        }
      });
      this.newArray = this.listTaskOther.map((item) => ({
        taskId: item.id,
        billable: true,
      }));

      this.formTask.patchValue({
        tasks: this.newArray,
      });
    });
  }
  customChkboxOnSelect({ selected }) {}
  deleteTask(e) {
    this.listTaskOther = this.listTaskOther.filter((obj) => obj !== e);
    this.listTaskCommon = [...this.listTaskCommon, e];
  }
  addTask(e) {
    this.listTaskCommon = this.listTaskCommon.filter((obj) => obj !== e);
    this.listTaskOther = [...this.listTaskOther, e];
  }
}
