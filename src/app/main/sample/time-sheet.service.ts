import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: "root" })
export class TimeSheetService {
  public checkUpdate: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient) {
    this.checkUpdate = new BehaviorSubject(false);
  }

  getAllTask() {
    return this._http.get(`${environment.apiUrl}/Task/GetAll`);
  }
}
