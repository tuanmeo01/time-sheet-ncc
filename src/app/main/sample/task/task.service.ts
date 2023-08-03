import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private _http: HttpClient) {}
  addTask(body) {
    return this._http.post<any>(`${environment.apiUrl}/Task/Save`, body);
  }
}
