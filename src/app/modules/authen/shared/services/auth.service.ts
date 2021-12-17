import { setAccessToken } from './../../../../shared/services/localStorage';
import { AuthApiService } from 'src/app/modules/authen/shared/services/auth-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDataLoginApi } from 'src/app/modules/authen/shared/types';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private toast: ToastrService,
    private authApiService: AuthApiService
  ) {}

  private accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  accessToken$ = this.accessTokenSubject.asObservable();

  login(data: IDataLoginApi): void {
    this.authApiService.loginApi(data).subscribe(
      (response) => {
        this.accessTokenSubject.next(response.result.accessToken);
        setAccessToken(this.accessTokenSubject.getValue());
        console.log(
          this.accessTokenSubject.getValue(),
          response,
          typeof response
        );
      },
      (error) => {
        this.toast.error(error.message, error.title);
      }
    );
  }
}
