import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { ResponseData } from "app/model/response";
import { TimeSheetService } from "../time-sheet.service";
import { Task } from "app/model/task";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-sample",
  templateUrl: "./sample.component.html",
  styleUrls: ["./sample.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SampleComponent implements OnInit {
  @ViewChild("editModal") editModal: NgbActiveModal;
  @ViewChild("addModal") addModal: NgbActiveModal;

  public contentHeader: object;
  public task: Task[];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;

  constructor(
    private _timeService: TimeSheetService,
    private modalService: NgbModal
  ) {}
  modalOpen(modalSM, row: Task) {
    this.modalService.open(modalSM, {
      centered: true,
      size: "sm",
    });
  }
  ngOnInit() {
    this._timeService.getAllTask().subscribe((res: ResponseData) => {
      this.task = res.result;
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
    console.log(event);

    if (
      !event.event.ctrlKey &&
      event.event.type === "click" &&
      event.column.name != "Hành động" &&
      event.column.name != "checkbox"
    ) {
      this.modalOpen(this.editModal, event.row);
    }
  }
  onSelect(e) {}
  filterUpdate(e) {}
  addTask() {
    this.modalOpen(this.addModal, null);
  }
}
