import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable({ providedIn: "root" })
export class TimeSheetService {
  constructor(private _http: HttpClient) {}
  getAllTask() {
    return this._http.get(`${environment.apiUrl}/Task/GetAll`);
  }
}
