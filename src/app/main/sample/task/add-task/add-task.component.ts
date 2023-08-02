import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent implements OnInit {
  @Input("modal") public modal: NgbActiveModal;
  @Input("title") public title: string;
  public typeTask = ["Common task", "Other task"];
  constructor() {}

  ngOnInit(): void {}
}
