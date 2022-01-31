import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, of, BehaviorSubject } from 'rxjs';
import { Login, LoginResponse } from 'src/app/@shared/models/auth';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }
  private _authChangeSub = new BehaviorSubject<boolean>(false)
  public authChanged = this._authChangeSub.asObservable();

  urlAddress = environment.apiUrl;
  public loginUser = (login: Login) => {

    let body = login;
    return this._http.post<LoginResponse>(this.urlAddress + "authenticate", body);
  }


  logout() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  setSession(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);

  }


  public isUserAuthenticated = (): boolean => {
    var token = localStorage.getItem("token");
    console.log(this._jwtHelper.decodeToken(token?.toString()))
    let tokenPresent = true;
    if (token === null) {
      tokenPresent = false;
    }
    let tokenExpired = this._jwtHelper.isTokenExpired(token?.toString())
    console.log("tokenPresent", tokenPresent)
    console.log("tokenExpired", tokenExpired)
    console.log(tokenPresent && !tokenExpired)
    return (tokenPresent && !tokenExpired);
  }

  public getCurrentUserName = (): string => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token?.toString());
    const name = decodedToken['unique_name']
    return name;

  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token?.toString());
    const role = decodedToken['role']
    return role === 'Administrators';
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
}
