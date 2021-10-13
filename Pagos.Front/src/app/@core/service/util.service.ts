import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackbarType } from '@env/constantes';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  openSnackBar(message: string, action: string, SnackBartype: string) {
    const config = new MatSnackBarConfig();
    switch (SnackBartype) {
      case SnackbarType.WARNING:
        config.duration = 5000;
        config.panelClass = ['snackbar-alert'];
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        config.panelClass = 'notif-success';
        this.snackBar.open('\ud83d\udcd1 ' + message, '\ud83d\udce3 ' + action, config);
        break;
      case SnackbarType.ERROR:
        config.duration = 5000;
        config.panelClass = ['snackbar-error'];
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        config.panelClass = 'notif-success';
        this.snackBar.open('\ud83d\udcd1 ' + message, '\u26d4 ' + action, config);
        break;
      case SnackbarType.SUCCESS:
        config.duration = 5000;
        config.panelClass = ['snackbar-success'];
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        config.panelClass = 'notif-success';
        this.snackBar.open('\ud83d\udcd1 ' + message, '\t\u2705 ' + action, config);
        break;
      case SnackbarType.INFO:
        config.duration = 5000;
        config.panelClass = ['snackbar-info'];
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        config.panelClass = 'notif-success';
        this.snackBar.open('\ud83d\udcd1 ' + message, '\ud83d\udda8\ufe0f ' + action, config);
        break;
    }
  }
}
