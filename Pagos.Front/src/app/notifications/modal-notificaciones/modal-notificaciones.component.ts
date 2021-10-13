import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MensajeService, UtilService } from '@core';
import { SnackbarType } from '@env/constantes';

@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css'],
})
export class ModalNotificacionesComponent implements OnInit {
  credentials = JSON.parse(sessionStorage.getItem('credentials'));

  constructor(
    public dialogRef: MatDialogRef<ModalNotificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.mensajeService.cambiarEstadoMensaje(this.data.notificacion?.Id, this.credentials.token).subscribe(
      (response: any) => {
        this.utilService.openSnackBar('Notificacion leida correctamente', 'CERRAR', SnackbarType.INFO);
        this.data = true;
        this.dialogRef.close(this.data);
      },
      () => {
        this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
