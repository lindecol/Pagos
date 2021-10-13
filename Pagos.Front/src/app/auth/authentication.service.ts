import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Credentials, CredentialsService} from './credentials.service';
import {Router} from '@angular/router';
import {LoginService, UtilService} from '@core';
import {SnackbarType} from '@env/constantes';

export interface LoginContext {
  username: string;
  password: string;
  pais: string;
  token: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private loginService: LoginService,
    private utilService: UtilService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      pais: context.pais,
      token: '',
    };
    this.loginService.login(context.username, context.password, context.pais).subscribe(
      (Token: any) => {
        if (Token) {
          context.token = JSON.parse(Token).VToken;
          data.token = JSON.parse(Token).VToken;
          this.credentialsService.setCredentials(data, context.remember);
          this.router.navigate(['/pagos'], { replaceUrl: true });
        }
      },
      (error) => {
        this.utilService.openSnackBar('El usuario o la contraseña no corresponden', 'CERRAR', SnackbarType.ERROR);
      }
    );

    // this.credentialsService.setCredentials(data, context.remember);
    // this.router.navigate(['/pagos'], {replaceUrl: true});
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
