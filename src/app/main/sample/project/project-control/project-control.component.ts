import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Stepper from "bs-stepper";
import { ProjectControlService } from "./project-control.service";
import { GeneralComponent } from "./general/general.component";
import { TeamComponent } from "./team/team.component";
import { TaskComponent } from "./task/task.component";
import { NotificationComponent } from "./notification/notification.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProjectComponent } from "../project.component";

@Component({
  selector: "app-project-control",
  templateUrl: "./project-control.component.html",
  styleUrls: ["./project-control.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectControlComponent implements OnInit {
  @Input("modal") public modal: NgbActiveModal;
  @Input("title") public title: string;
  @Input("type") public type: number;
  @Input("row") public row: any;
  @ViewChild("stepOne") stepOne: GeneralComponent;
  @ViewChild("stepTwo") stepTwo: TeamComponent;
  @ViewChild("stepThree") stepThree: TaskComponent;
  @ViewChild("stepFour") stepFour: NotificationComponent;
  @ViewChild("refresh") refresh: ProjectComponent;
  public loading = false;
  public validForm: boolean = true;
  public stepper: Stepper;
  constructor(
    private _projectControl: ProjectControlService,
    private fb: FormBuilder,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }
  next() {
    this.stepper.next();
  }
  onSubmit() {
    // return false;
  }
  saveProject() {
    let formAddProject = {};
    if (this.type === 2) {
      formAddProject = {
        ...this.stepOne.formGeneral.value,
        ...this.stepTwo.formTeam.value,
        ...this.stepThree.formTask.value,
        ...this.stepFour.formNoti.value,
        id: this.row.id,
      };
      this._projectControl.addProject(formAddProject).subscribe(
        (res) => {
          this._toast.success("Edit Project", "Success", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
          this.refresh.getClientAll();
        },
        (error) => {
          this._toast.error(`${error.error.error.message}`, "Fail", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
        }
      );
    } else {
      formAddProject = {
        ...this.stepOne.formGeneral.value,
        ...this.stepTwo.formTeam.value,
        ...this.stepThree.formTask.value,
        ...this.stepFour.formNoti.value,
      };

      this._projectControl.addProject(formAddProject).subscribe(
        (res) => {
          this._toast.success("Add Project", "Success", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
          this.refresh.getClientAll();
        },
        (error) => {
          this._toast.error(`${error.error.error.message}`, "Fail", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
        }
      );
    }

    this.modal.close("Accept click");
  }
}
