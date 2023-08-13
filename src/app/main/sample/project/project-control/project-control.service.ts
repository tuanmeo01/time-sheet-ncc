import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable({ providedIn: "root" })
export class ProjectControlService {
  constructor(private _http: HttpClient) {}
  getAllClient() {
    return this._http.get<any>(`${environment.apiUrl}/Customer/GetAll`, {});
  }
  getAllTeamMember() {
    return this._http.get<any>(
      `${environment.apiUrl}/User/GetUserNotPagging`,
      {}
    );
  }
  getAllTask() {
    return this._http.get<any>(`${environment.apiUrl}/Task/GetAll`);
  }
}
