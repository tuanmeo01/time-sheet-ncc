import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { TimeSheetService } from "../../time-sheet.service";
import { TaskService } from "../task.service";
import { Task } from "app/model/task";
@Component({
  selector: "app-control-task",
  templateUrl: "./task-controlcomponent.html",
  styleUrls: ["./task-control.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddTaskComponent implements OnInit {
  @Input("modal") public modal: NgbActiveModal;
  @Input("title") public title: string;
  @Input("task") public taskEdit: Task;
  formAddTask: FormGroup; //
  public isEdit: boolean = false;
  public typeTask = [
    {
      value: 1,
      item: "Common task",
    },
    {
      value: 0,
      item: "Others task",
    },
  ];
  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private _toast: ToastrService,
    private _timeSheetService: TimeSheetService
  ) {
    this.formAddTask = this.fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      id: [null],
    });
  }

  ngOnInit(): void {
    console.log("edit", this.taskEdit);
    if (this.taskEdit) {
      //edit
      this.formAddTask.patchValue({
        name: this.taskEdit.name,
        type: this.taskEdit.type,
        id: this.taskEdit.id,
      });
      this.isEdit = true;
    }
  }
  onSubmit() {
    if (this.formAddTask.valid) {
      if (this.isEdit) {
        //edit
        this._taskService.addTask(this.formAddTask.value).subscribe(
          (res) => {
            if (res.success) {
              this._toast.success("Add task", "Success", {
                positionClass: "toast-top-right",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              });
              this.modal.close();
              this._timeSheetService.checkUpdate.next(true);
            }
          },
          (error) => {
            this._toast.error(
              `Task ${this.formAddTask.get("name").value} is already exist`,
              "Fail",
              {
                positionClass: "toast-top-right",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              }
            );
          }
        );
      } else {
        this.formAddTask.removeControl("id");
        this._taskService.addTask(this.formAddTask.value).subscribe(
          (res) => {
            if (res.success) {
              this._toast.success("Add task", "Success", {
                positionClass: "toast-top-right",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              });
              this.modal.close();
              this._timeSheetService.checkUpdate.next(true);
            }
          },
          (error) => {
            this._toast.error(
              `Task ${this.formAddTask.get("name").value} is already exist`,
              "Fail",
              {
                positionClass: "toast-top-right",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              }
            );
          }
        );
      }
    } else {
      this._toast.warning("Form invalid", "Fail", {
        positionClass: "toast-top-right",
        toastClass: "toast ngx-toastr",
        closeButton: true,
      });
    }
    return true;
  }
}
