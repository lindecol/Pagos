import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {frameMultiPagosUrl, framePagosUrl} from '@env/constantes';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pagos.component.html',
  styleUrls: ['./modal-pagos.component.scss'],
})
export class ModalPagosComponent implements OnInit {
  urlSafe: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<ModalPagosComponent>,
              private sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log('explode this shit: ', this.data)
    let url = '';
    if (this.data.multi) {
      url = frameMultiPagosUrl;
      url = url.replace('{objeto}', encodeURIComponent(JSON.stringify(this.data.list)));
    } else {
      url = framePagosUrl;
      url = url.replace('{monto}', this.data.list.Monto);
      url = url.replace('{referencia}', this.data.list.Documento);
      url = url.replace('{EmpId}', this.data.list.EmpId);
    }
    console.log('explode this shit: ', url)
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  onSubmit() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
