import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  @Input("row") public row: any;

  public isChecked: boolean = true;
  public formNoti: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formNoti = this.fb.group({
      isAllUserBelongTo: [true],
      isNotifyToKomu: [""],
      komuChannelId: [{ value: "", disabled: this.isChecked }],
      projectTargetUsers: [[]],
    });
    this.formNoti.patchValue({
      ...this.row,
    });
  }
  checked() {
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.formNoti.get("komuChannelId").disable();
    } else {
      this.formNoti.get("komuChannelId").enable();
    }
  }
  onSubmit() {}
}
