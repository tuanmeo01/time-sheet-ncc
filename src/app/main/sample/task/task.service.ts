import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private _http: HttpClient) {}
  addTask(body) {
    return this._http.post<any>(`${environment.apiUrl}/Task/Save`, body);
  }
  archive(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Id", id);

    return this._http.delete<any>(`${environment.apiUrl}/Task/Archive`, {
      params: queryParams,
    });
  }
  delete(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Id", id);
    return this._http.delete<any>(`${environment.apiUrl}/Task/Delete`, {
      params: queryParams,
    });
  }
}
