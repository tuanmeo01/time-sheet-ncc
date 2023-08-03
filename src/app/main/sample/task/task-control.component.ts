import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { ResponseData } from "app/model/response";
import { TimeSheetService } from "../time-sheet.service";
import { Task } from "app/model/task";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "./task.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sample",
  templateUrl: "./task-control.component.html",
  styleUrls: ["./task-control.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SampleComponent implements OnInit {
  @ViewChild("modal") modal: NgbActiveModal;

  public contentHeader: object;
  public task: Task[];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public taskEdit: Task;
  constructor(
    private _timeService: TimeSheetService,
    private modalService: NgbModal,
    private _taskService: TaskService,
    private _toast: ToastrService
  ) {}
  modalOpen(modalSM, row: Task) {
    this.taskEdit = row;
    this.modalService.open(modalSM, {
      centered: true,
      size: "sm",
    });
  }
  ngOnInit() {
    this._timeService.checkUpdate.subscribe((res) => {
      if (res) {
        this._timeService.getAllTask().subscribe((res: ResponseData) => {
          this.task = res.result;
        });
      } else {
        this._timeService.getAllTask().subscribe((res: ResponseData) => {
          this.task = res.result;
        });
      }
    });

    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Sample",
            isLink: false,
          },
        ],
      },
    };
  }
  onActivate(event) {
    if (
      !event.event.ctrlKey &&
      event.event.type === "click" &&
      event.column.name != "Hành động" &&
      event.column.name != "checkbox"
    ) {
      this.modalOpen(this.modal, event.row);
    }
  }
  onSelect(e) {}
  filterUpdate(e) {}
  addTask() {
    this.modalOpen(this.modal, null);
  }
  archiveTask(task: Task) {
    this._taskService.archive(task.id).subscribe((res) => {
      this._toast.success("Archice task", "Success", {
        positionClass: "toast-top-right",
        toastClass: "toast ngx-toastr",
        closeButton: true,
      });
    });
  }
  deleteTask(task: Task) {
    this._taskService.delete(task.id).subscribe((res) => {
      this._toast.success("Delete task", "Success", {
        positionClass: "toast-top-right",
        toastClass: "toast ngx-toastr",
        closeButton: true,
      });
      this._timeService.checkUpdate.next(true);
    });
  }
}
