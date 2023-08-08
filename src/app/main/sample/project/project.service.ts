import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable({ providedIn: "root" })
export class ProjectService {
  constructor(private _http: HttpClient) {}
  getAll(status: number, search: string) {
    const params = new HttpParams().set("status", status).set("search", search);
    return this._http.get<any>(`${environment.apiUrl}/Project/getAll`, {
      params,
    });
  }
}
