import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../task.service";
import { ToastrService } from "ngx-toastr";
import { TimeSheetService } from "../../time-sheet.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddTaskComponent implements OnInit {
  @Input("modal") public modal: NgbActiveModal;
  @Input("title") public title: string;
  formAddTask: FormGroup; //
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
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.formAddTask.valid) {
      this._taskService.addTask(this.formAddTask.value).subscribe((res) => {
        if (res.success) {
          this._toast.success("Thêm task", "Thành công", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
          this.modal.close();
          this._timeSheetService.getAllTask().subscribe();
        } else {
          this._toast.error("Thêm task", "Thất bại", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
          this.modal.close();
        }
      });
    } else {
      console.log("formAddTask is invalid. Please check the fields.");
    }
    return true;
  }
}
