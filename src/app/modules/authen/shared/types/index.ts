export interface ILoginFormData {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface IDataLoginApi {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}
