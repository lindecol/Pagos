import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

import {environment} from '@env/environment';
import {ListaService, Logger, untilDestroyed, UtilService} from '@core';
import {AuthenticationService} from './authentication.service';
import {SnackbarType} from '@env/constantes';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  listaPais: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listaService: ListaService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.listaService.listaPais().subscribe(
      (response: any) => {
        this.listaPais = response;
      },
      (error: any) => {
        if (error.status === 401) {
          this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
        } else {
          this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
        }
      }
    );
  }

  ngOnDestroy() {
  }

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams.redirect || '/pagos'], {replaceUrl: true});
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email,Validators.required]],
      password: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }
}
