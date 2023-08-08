import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "./project.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  public contentHeader: object;
  public basicSelectedOption: number = 10;
  public allClient: any;
  public form: FormGroup;
  public kitchenSinkRows: any;
  public SelectionType = SelectionType;
  public clientDefault: string;
  public ColumnMode = ColumnMode;
  public status = [
    { name: "All Project", value: "" },
    { name: "Active Project", value: 0 },
    { name: "DeActive Project", value: 1 },
  ];
  public statusDefault: number | string;
  constructor(
    private _projectService: ProjectService,
    private fb: FormBuilder
  ) {}

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
    console.log(this.statusDefault);

    this.form = this.fb.group({
      status: 0,
      search: ["", [Validators.required]],
    });
    this.getClientAll();
  }
  getClientAll() {
    this._projectService
      .getAll(this.form.get("status").value, this.form.get("search").value)
      .subscribe((res) => {
        const temp = [
          ...new Set(
            res.result.map((item) => {
              return item.customerName;
            })
          ),
        ];
        this.allClient = temp;

        this.clientDefault = this.allClient[0];
        console.log(this.clientDefault);
        this.getAll();
      });
  }
  getAll() {
    this.form.patchValue({
      search: this.clientDefault,
    });
    this._projectService
      .getAll(this.form.get("status").value, this.form.get("search").value)
      .subscribe((res) => {
        this.kitchenSinkRows = res.result;
      });
  }
  getAllProject() {}
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
  onActivate(e) {}
  onSelect(e) {}
}
