import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Stepper from "bs-stepper";

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
  public stepper: Stepper;
  constructor() {}

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
    return false;
  }
}
