import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  public isChecked: boolean = true;
  constructor() {}

  ngOnInit(): void {}
  checked() {
    this.isChecked = !this.isChecked;
  }
}
