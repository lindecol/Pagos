import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { api, Headers } from '@env/constantes';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  constructor(private http: HttpClient) {}

  cambiarEstadoMensaje(idMensaje: any, token: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    headers = headers.append(Headers.Token, token);
    return this.http
      .get(api.server + api.cambiarEstadoMensaje + idMensaje, {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }
}
