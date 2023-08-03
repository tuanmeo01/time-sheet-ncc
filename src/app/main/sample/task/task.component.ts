import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { ResponseData } from "app/model/response";
import { TimeSheetService } from "../time-sheet.service";
import { Task } from "app/model/task";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "./task.service";
import { ToastrService } from "ngx-toastr";
import { error } from "console";

@Component({
  selector: "app-sample",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SampleComponent implements OnInit {
  @ViewChild("modal") modal: NgbActiveModal;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private tempData = [];
  public contentHeader: object;
  public task: Task[];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public taskEdit: Task;
  public rows: Task[];
  public typeTask = [
    {
      value: null,
      item: "All",
    },
    {
      value: 1,
      item: "Common task",
    },
    {
      value: 0,
      item: "Others task",
    },
  ];
  public title: string;
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
          this.rows = res.result;
          this.tempData = this.rows;
          this.task = this.rows;
        });
      } else {
        this._timeService.getAllTask().subscribe((res: ResponseData) => {
          this.rows = res.result;

          this.tempData = this.rows;
          this.task = this.rows;
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
            name: "Task",
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
      this.title = "Edit task";
      this.modalOpen(this.modal, event.row);
    }
  }
  onSelect(e) {}
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.task = temp;
    this.table.offset = 0;
  }
  filterFast(event) {
    const val = event.value;
    console.log(val);

    if (val === null) {
      this.task = this.tempData;
    } else {
      const temp = this.tempData.filter(function (d) {
        if (typeof val === "number") {
          return d.type === val;
        } else if (typeof val === "string" && Array.isArray(d.type)) {
          return d.type.includes(val);
        }
        return false;
      });
      this.task = temp;
    }

    this.table.offset = 0;
  }

  addTask() {
    this.title = "Add task";
    this.modalOpen(this.modal, null);
  }
  archiveTask(task: Task) {
    this._taskService.archive(task.id).subscribe(
      (res) => {
        this._toast.success("Archive task", "Success", {
          positionClass: "toast-top-right",
          toastClass: "toast ngx-toastr",
          closeButton: true,
        });
        this._timeService.checkUpdate.next(true);
      },

      (error) => {
        this._toast.error("Archive task", "Error", {
          positionClass: "toast-top-right",
          toastClass: "toast ngx-toastr",
          closeButton: true,
        });
      }
    );
  }
  deleteTask(task: Task) {
    this._taskService.delete(task.id).subscribe(
      (res) => {
        this._toast.success("Delete task", "Success", {
          positionClass: "toast-top-right",
          toastClass: "toast ngx-toastr",
          closeButton: true,
        });
        this._timeService.checkUpdate.next(true);
      },
      (error) => {
        this._toast.error(`error.error.message`, "Error", {
          positionClass: "toast-top-right",
          toastClass: "toast ngx-toastr",
          closeButton: true,
        });
      }
    );
  }
}
