import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { FormType } from "app/model/modalType";
import { format } from "date-fns";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { ProjectService } from "./project.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  @ViewChild("modal") modal: NgbActiveModal;
  @ViewChild("modal2") modal2: NgbActiveModal;
  public loading = false;

  public contentHeader: object;
  public basicSelectedOption: number = 10;
  public allClient: any;
  public form: FormGroup;
  public kitchenSinkRows: any;
  public title: string;
  public type: FormType;
  public SelectionType = SelectionType;
  public clientDefault: string;
  public ColumnMode = ColumnMode;
  public status = [
    { name: "All Project", value: "" },
    { name: "Active Project", value: 0 },
    { name: "DeActive Project", value: 1 },
  ];
  public statusDefault: number | string;
  public row: any;
  constructor(
    private _projectService: ProjectService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _toast: ToastrService
  ) {}
  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm");
  }
  modalOpen(modalSM, title: string, row: any, type: FormType) {
    this.modalService.open(modalSM, {
      centered: true,
      size: "lg",
    });
    this.title = title;
    this.type = type;
    this.row = row;
  }
  ngOnInit(): void {
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
    this.statusDefault = this.status[1].value;

    this.form = this.fb.group({
      status: 0,
      search: ["", [Validators.required]],
    });
    this.getClientAll();
  }
  getClientAll() {
    this.loading = true;
    this._projectService
      .getAll(this.form.get("status").value, this.form.get("search").value)
      .subscribe((res) => {
        this.loading = false;
        const temp = [
          ...new Set(
            res.result.map((item) => {
              return item.customerName;
            })
          ),
        ];
        this.allClient = temp;
        this.clientDefault = this.allClient[0];
        this.getAll();
      });
  }
  getAll() {
    this.loading = true;
    this.form.patchValue({
      search: this.clientDefault,
    });
    this._projectService
      .getAll(this.form.get("status").value, this.form.get("search").value)
      .subscribe((res) => {
        this.loading = false;
        this.kitchenSinkRows = res.result;
      });
  }

  filterUpdate(e) {
    this.form.patchValue({
      search: e.target.value,
    });
  }
  changeClient(e) {
    this.form.patchValue({
      search: e,
    });
    this.getAll();
  }
  changeStatus(e) {
    this.form.patchValue({
      status: e.value,
    });
    this.getAll();
  }
  onActivate(event) {
    if (
      !event.event.ctrlKey &&
      event.event.type === "click" &&
      event.column.name != "Actions" &&
      event.column.name != "checkbox"
    ) {
      this._projectService.getProjectById(event.row.id).subscribe((res) => {
        this.modalOpen(this.modal, "Edit project", res.result, FormType.Update);
      });
    }
  }
  onSelect(e) {}
  deleteProject(e) {
    Swal.fire({
      title: "Are U sure about that?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      preConfirm: async () => {
        return this._projectService.deleteProject(e.id).subscribe(
          (res) => {
            this._toast.success("Delete Project", "Success", {
              positionClass: "toast-top-right",
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.getAll();
          },
          (error) => {
            this._toast.error(`${error.error.error.message}`, "Error", {
              positionClass: "toast-top-right",
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
          }
        );
      },
      cancelButtonColor: "#E42728",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, I wanna it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
      allowOutsideClick: () => {
        return !Swal.isLoading();
      },
    });
  }
  deActiveProject(e) {
    Swal.fire({
      title: "Are U sure about that?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      preConfirm: async () => {
        return this._projectService.deActiveProject(e.id).subscribe(
          (res) => {
            this._toast.success("DeActive Project", "Success", {
              positionClass: "toast-top-right",
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
            this.getAll();
          },
          (error) => {
            this._toast.error(`${error.error.error.message}`, "Error", {
              positionClass: "toast-top-right",
              toastClass: "toast ngx-toastr",
              closeButton: true,
            });
          }
        );
      },
      cancelButtonColor: "#E42728",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, I wanna it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
      allowOutsideClick: () => {
        return !Swal.isLoading();
      },
    });
  }
  showSpinner() {
    this.loading = true;
  }
  addProject() {
    this.modalOpen(this.modal, "Add project", null, FormType.Create);
  }
  viewProject(e) {
    this.modalOpen(this.modal2, "View project", e, null);
  }
}
