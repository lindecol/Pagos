import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MediaObserver} from '@angular/flex-layout';

import {AuthenticationService, CredentialsService} from '@app/auth';
import {ListaService, UtilService} from '@core';
import {SnackbarType} from '@env/constantes';
import {SharedService} from '@core/service/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  notifications: any[] = [];
  credentials = JSON.parse(sessionStorage.getItem('credentials'));
  clickEventsubscription: Subscription;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private listaService: ListaService,
    private utilService: UtilService,
    private media: MediaObserver,
    private sharedService: SharedService
  ) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.cargarLista();
    })
  }

  ngOnInit() {
    this.cargarLista();
    this.listaService.ObtenerNit(this.credentials.username).subscribe(
      (response: any) => {
        localStorage.setItem('nit',response.Nit);
      },
      () => {
        this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
      }
    );

  }

  cargarLista() {
    this.listaService.listaSesion(this.credentials.username, this.credentials.token).subscribe(
      (response: any) => {
        this.listaService.listaNotificaciones(response.Id).subscribe(
          (listaNotificaciones: any) => {
            this.notifications = listaNotificaciones;
          },
          () => {
            this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
          }
        );
      },
      () => {
        this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
      }
    );
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }



  get nit(): string | null {
    const nit = localStorage.getItem('nit');
    return nit ? nit : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
