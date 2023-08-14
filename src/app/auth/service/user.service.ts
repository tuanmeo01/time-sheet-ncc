import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({ providedIn: "root" })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}
  getCurrentUser() {
    return this._http
      .get<any>(`${environment.apiUrl}/Session/GetCurrentLoginInformations`)
      .subscribe((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.result.user));
      });
  }
}
