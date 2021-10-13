import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ModalNotificacionesComponent} from '@app/notifications/modal-notificaciones/modal-notificaciones.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarType} from '@env/constantes';
import {ListaService, UtilService} from '@core';
import {SharedService} from '@core/service/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  data: MatTableDataSource<any>;
  displayedColumns: string[] = ['leido', 'fecha', 'asunto', 'detalle', 'adjunto'];
  dataSource: MatTableDataSource<any>;
  notifications: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  credentials = JSON.parse(sessionStorage.getItem('credentials'));

  constructor(public dialog: MatDialog, private listaService: ListaService, private utilService: UtilService, private sharedService: SharedService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargarLista();
   //  this.cargarTest();
  }

  cargarTest() {
    this.notifications = [
      {
        Id: 105,
        FechaMensaje: '2021-01-11T20:34:45',
        UsuarioLinde: 'BROADCAST',
        Asunto: 'APERTURA',
        ContenidoMensaje: 'MENSAJE DE INICIO DE CORRESPONDENCIA EN LOS MENSAJES DEL MÓDULO DE PAGO ELECTRÓNICO',
        Leido: false,
        IdSesion: 0,
        Adjunto: 'JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTU2NQo+PgpzdHJlYW0KMC41NjcwMDAwMDAwMDAwMDAxIHcKMCBHCjAuMTYgMC41IDAuNzMgcmcKMC43OCBHCjAuIHcKNDAuIDgwMS44ODk5OTk5OTk5OTk5ODY0IDM2LjI3MDg0NDY4NjY0ODQ4NzcgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjIgMTAgVGYKMTEuNSBUTAoxLiBnCjQ1LiA3ODguMzg5OTk5OTk5OTk5OTg2NCBUZAooIykgVGoKRVQKMC4xNiAwLjUgMC43MyByZwowLjc4IEcKMC4gdwo3Ni4yNzA4NDQ2ODY2NDg0NzM1IDgwMS44ODk5OTk5OTk5OTk5ODY0IDE0MS4zMzkyOTE1NTMxMzM0NDk1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YyIDEwIFRmCjExLjUgVEwKMS4gZwo4MS4yNzA4NDQ2ODY2NDg0NzM1IDc4OC4zODk5OTk5OTk5OTk5ODY0IFRkCihPQkpFQ1RJRCkgVGoKRVQKMC4xNiAwLjUgMC43MyByZwowLjc4IEcKMC4gdwoyMTcuNjEwMTM2MjM5NzgxOTUxNCA4MDEuODg5OTk5OTk5OTk5OTg2NCAxNzEuNTI1OTk0NTUwNDA4NjU0NSAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMjIyLjYxMDEzNjIzOTc4MTk1MTQgNzg4LjM4OTk5OTk5OTk5OTk4NjQgVGQKKE1BTkNPRElHTykgVGoKRVQKMC4xNiAwLjUgMC43MyByZwowLjc4IEcKMC4gdwozODkuMTM2MTMwNzkwMTkwNjM0MyA4MDEuODg5OTk5OTk5OTk5OTg2NCAxNjYuMTQzODY5MjA5ODA5MjI0NyAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMzk0LjEzNjEzMDc5MDE5MDYzNDMgNzg4LjM4OTk5OTk5OTk5OTk4NjQgVGQKKFNFQ0NPRElHTykgVGoKRVQKMC45NiBnCjAuNzggRwowLiB3CjQwLiA3ODAuMzg5OTk5OTk5OTk5OTg2NCAzNi4yNzA4NDQ2ODY2NDg0ODc3IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwo0NS4gNzY2Ljg4OTk5OTk5OTk5OTk4NjQgVGQKKDEpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4gdwo3Ni4yNzA4NDQ2ODY2NDg0NzM1IDc4MC4zODk5OTk5OTk5OTk5ODY0IDE0MS4zMzkyOTE1NTMxMzM0NDk1IC0yMS40OTk5OTk5OTk5OTk5OTY0IHJlCmYKQlQKL0YxIDEwIFRmCjExLjUgVEwKMC4zMTQgZwo4MS4yNzA4NDQ2ODY2NDg0NzM1IDc2Ni44ODk5OTk5OTk5OTk5ODY0IFRkCigyNDg0KSBUagpFVAowLjk2IGcKMC43OCBHCjAuIHcKMjE3LjYxMDEzNjIzOTc4MTk1MTQgNzgwLjM4OTk5OTk5OTk5OTk4NjQgMTcxLjUyNTk5NDU1MDQwODY1NDUgLTIxLjQ5OTk5OTk5OTk5OTk5NjQgcmUKZgpCVAovRjEgMTAgVGYKMTEuNSBUTAowLjMxNCBnCjIyMi42MTAxMzYyMzk3ODE5NTE0IDc2Ni44ODk5OTk5OTk5OTk5ODY0IFRkCigwMDgzMTAwMTApIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4gdwozODkuMTM2MTMwNzkwMTkwNjM0MyA3ODAuMzg5OTk5OTk5OTk5OTg2NCAxNjYuMTQzODY5MjA5ODA5MjI0NyAtMjEuNDk5OTk5OTk5OTk5OTk2NCByZQpmCkJUCi9GMSAxMCBUZgoxMS41IFRMCjAuMzE0IGcKMzk0LjEzNjEzMDc5MDE5MDYzNDMgNzY2Ljg4OTk5OTk5OTk5OTk4NjQgVGQKKDAwODMxMCkgVGoKRVQKMC43OCBHCjAuIHcKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvU3ltYm9sCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgovRjE0IDE4IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAyLjAuMCkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIxMDExMTExNTY0Mi0wNScwMCcpCj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMTc2OSAwMDAwMCBuCjAwMDAwMDM1ODYgMDAwMDAgbgowMDAwMDAwMDE1IDAwMDAwIG4KMDAwMDAwMDE1MiAwMDAwMCBuCjAwMDAwMDE4MjYgMDAwMDAgbgowMDAwMDAxOTUxIDAwMDAwIG4KMDAwMDAwMjA4MSAwMDAwMCBuCjAwMDAwMDIyMTQgMDAwMDAgbgowMDAwMDAyMzUxIDAwMDAwIG4KMDAwMDAwMjQ3NCAwMDAwMCBuCjAwMDAwMDI2MDMgMDAwMDAgbgowMDAwMDAyNzM1IDAwMDAwIG4KMDAwMDAwMjg3MSAwMDAwMCBuCjAwMDAwMDI5OTkgMDAwMDAgbgowMDAwMDAzMTI2IDAwMDAwIG4KMDAwMDAwMzI1NSAwMDAwMCBuCjAwMDAwMDMzODggMDAwMDAgbgowMDAwMDAzNDkwIDAwMDAwIG4KMDAwMDAwMzgzNCAwMDAwMCBuCjAwMDAwMDM5MjAgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDIxCi9Sb290IDIwIDAgUgovSW5mbyAxOSAwIFIKL0lEIFsgPDQ2NENEQzZBNjQ1NDBEQUVDMUVFNzg4QUYxOTQ1NDhDPiA8NDY0Q0RDNkE2NDU0MERBRUMxRUU3ODhBRjE5NDU0OEM+IF0KPj4Kc3RhcnR4cmVmCjQwMjQKJSVFT0Y='
      }
    ];
    this.dataSource = new MatTableDataSource(this.notifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarLista() {
    this.listaService.listaSesion(this.credentials.username, this.credentials.token).subscribe(
      (response: any) => {
        this.listaService.listaNotificaciones(response.Id).subscribe(
          (listaNotificaciones: any) => {
            this.notifications = listaNotificaciones;
            this.dataSource = new MatTableDataSource(listaNotificaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirAdjunto(notificacion: any) {
    if (notificacion.Adjunto) {
      const linkSource = 'data:application/pdf;base64,' + notificacion.Adjunto;
      const downloadLink = document.createElement('a');
      const fileName = 'adjunto.pdf';

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      this.utilService.openSnackBar('No contiene Adjunto.', 'CERRAR', SnackbarType.ERROR);
    }
  }

  abrirNotificacion(notificacion: any) {
    const dialogRef = this.dialog.open(ModalNotificacionesComponent, {
      maxWidth: '400px',
      width: '400px',
      disableClose: true,
      data: {notificacion},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.sharedService.sendClickEvent();
      this.ngOnInit();
    });
  }
}
