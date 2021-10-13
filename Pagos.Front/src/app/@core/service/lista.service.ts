import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {api, Headers} from '@env/constantes';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private http: HttpClient) {
  }

  listaPais() {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    return this.http
      .get(api.server + api.listaPais, {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }

  listaNotificaciones(idSesion: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    return this.http
      .get(api.server + api.listaNotificaciones + idSesion, {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }

  ObtenerNit(username: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    return this.http
      .get(api.server + api.ObtenerNit + encodeURIComponent(username), {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }

  listaSesion(usuario: any, token: any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    headers = headers.append(Headers.Token, token);
    return this.http
      .get(api.server + api.listaSesion + encodeURIComponent(usuario), {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }


  ListarGeneralPagos(empId: any, documento:any) {
    let headers = new HttpHeaders();
    headers = headers.append(Headers.responseType, 'application/json');
    return this.http
      .get(api.server + api.ListarGeneralPagos + empId + '&nit='+ localStorage.getItem('nit') + '&documento='+ documento, {
        headers,
      })
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }
}
