import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService, UtilService } from '@core';
import { AuthenticationService } from '@app/auth';
import { SnackbarType } from '@env/constantes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  credentials = JSON.parse(sessionStorage.getItem('credentials'));

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  changuePassword() {
    this.loginService
      .cambiarPassword(this.credentials.username, this.loginForm.controls.password.value, this.credentials.token)
      .subscribe(
        (response: any) => {
          this.utilService.openSnackBar('Contraseña cambiada correctamente', 'CERRAR', SnackbarType.INFO);
          this.loginForm.reset();
          this.loginForm.clearAsyncValidators();
          this.loginForm.controls.username.setValue(this.credentials.username);
        },
        () => {
          this.utilService.openSnackBar('Error al cambiar la contraseña', 'CERRAR', SnackbarType.ERROR);
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
}
