import { AuthService } from 'src/app/modules/authen/shared/services/auth.service';
import {
  IDataLoginApi,
  ILoginFormData,
} from 'src/app/modules/authen/shared/types/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  loginFormData: ILoginFormData = {
    username: '',
    password: '',
    isRemember: false,
  };

  handleOnSubmit() {
    const data: IDataLoginApi = {
      userNameOrEmailAddress: this.loginFormData.username,
      password: this.loginFormData.password,
      rememberClient: this.loginFormData.isRemember,
    };

    this.authService.login(data);
  }

  ngOnInit(): void {}
}
