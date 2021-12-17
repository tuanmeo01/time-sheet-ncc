import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDataLoginApi } from 'src/app/modules/authen/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}
  private loginApiUrl = 'api/TokenAuth/Authenticate';

  loginApi(data: IDataLoginApi): Observable<any> {
    return this.http
      .post<IDataLoginApi>(`${environment.baseUrl}/${this.loginApiUrl}`, data)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errMessage = {
      title: '',
      message: '',
    };
    if (error.status === 0) {
      errMessage.message = `Error: ${error.message}`;
    } else {
      errMessage.title = `Error code: ${error.status}`;
      errMessage.message = `Message: ${error.message}`;
    }

    return throwError(errMessage);
  }
}
