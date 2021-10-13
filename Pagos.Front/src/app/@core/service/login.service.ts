import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { api, Headers, SnackbarType } from '@env/constantes';
import { UtilService } from '@app/@core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private utilService: UtilService) {}

  public login(user: string, pass: string, pais: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    headers = headers.append(Headers.Password, pass);
    return this.http
      .post(api.server + api.login + encodeURIComponent(user) + '/' + pais, null,{
        headers,
        responseType: 'text',
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        }),
        catchError((error) =>
          of(this.utilService.openSnackBar('El usuario o la contraseña no corresponden', 'CERRAR', SnackbarType.ERROR))
        )
      );
  }

  cambiarPassword(usuario: any, password: any, token: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    headers = headers.append(Headers.Token, token);
    return this.http
      .get(api.server + api.cambiarPassword + usuario + '/' + password, {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }
}
