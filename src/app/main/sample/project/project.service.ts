import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "environments/environment";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: "root" })
export class ProjectService {
  constructor(private _http: HttpClient) {}
  getAll(status: number, search: string) {
    const params = new HttpParams().set("status", status).set("search", search);
    return this._http.get<any>(`${environment.apiUrl}/Project/getAll`, {
      params,
    });
  }
  deleteProject(id: string) {
    const params = new HttpParams().set("Id", id);
    return this._http.delete<any>(`${environment.apiUrl}/Project/Delete`, {
      params,
    });
  }
  deActiveProject(id: string) {
    return this._http.post<any>(`${environment.apiUrl}/Project/Inactive`, {
      id,
    });
  }
  getAllTask() {
    return this._http.get(`${environment.apiUrl}/Task/GetAll`);
  }
  getProjectById(id: string) {
    const params = new HttpParams().set("input", id);
    return this._http.get<any>(`${environment.apiUrl}/Project/Get`, { params });
  }
  getTimeSheetProject(body) {
    const params = new HttpParams()
      .set("projectId", body.get("projectId").value)
      .set("startDate", body.get("startDate").value)
      .set("endDate", body.get("endDate").value);
    return this._http.get<any>(
      `${environment.apiUrl}/TimeSheetProject/GetTimeSheetStatisticTasks`,
      { params }
    );
  }
  getTimeSheetTeam(body) {
    const params = new HttpParams()
      .set("projectId", body.get("projectId").value)
      .set("startDate", body.get("startDate").value)
      .set("endDate", body.get("endDate").value);
    return this._http.get<any>(
      `${environment.apiUrl}/TimeSheetProject/GetTimeSheetStatisticTeams`,
      { params }
    );
  }
}
