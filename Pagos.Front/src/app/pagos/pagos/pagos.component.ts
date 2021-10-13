import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {DateAdapter} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalPagosComponent} from '@app/pagos/pagos/modal-pagos/modal-pagos.component';
import {listaCompa, SnackbarType} from '@env/constantes';
import {ListaService, UtilService} from '@core';
import {DatePipe} from '@angular/common';
import {SharedService} from '@core/service/shared.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit, AfterViewInit {
  listEntidades: any[] = [];
  credentials = JSON.parse(sessionStorage.getItem('credentials'));
  data: MatTableDataSource<any>;
  searchForm!: FormGroup;
  itsLoading = false;
  checked = false;
  listaCheckeada: any[] = [];
  displayedColumns: string[] = ['select', 'id', 'numeroDocumento', 'monto', 'detalle', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    private listaService: ListaService,
    private utilService: UtilService,
    private sharedService: SharedService,
  ) {
    this._adapter.setLocale('es');
    this.data = new MatTableDataSource([]);
    this.dataSource = new MatTableDataSource([]);
    this.createForm();
  }

  ngAfterViewInit() {
    this.listEntidades = listaCompa;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateCheckedList(event: any, index: any) {
    if (event.checked) {
      console.log(this.dataSource.data[index]);
    }
    this.listaCheckeada = this.dataSource.data.filter(pago => pago.hasOwnProperty('checked') && pago.checked);
  }

  allCheck() {
    this.dataSource.data.map(row => {
      row.checked = !this.checked;
      return row;
    });
    this.listaCheckeada = this.dataSource.data.filter(pago => pago.hasOwnProperty('checked') && pago.checked);
  }

  ngOnInit(): void {
    // this.cargarTest();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarTest() {
    this.dataSource = new MatTableDataSource([
      {EmpId: '1', Documento: '21752698', Monto: '10000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '11000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '12000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '13000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '14000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '15000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '16000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '17000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '18000', Porcentaje: '15'},
      {EmpId: '1', Documento: '21752698', Monto: '19000', Porcentaje: '15'}
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscar() {
    this.itsLoading = true;
    this.listaService.listaSesion(this.credentials.username, this.credentials.token).subscribe(
      (response: any) => {
        this.listaService.ListarGeneralPagos(this.searchForm.controls.company.value, this.searchForm.controls.numeroDocumento.value).subscribe(
          (listaPago: any) => {
            this.dataSource = new MatTableDataSource(listaPago);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.itsLoading = false;
          },
          () => {
            this.itsLoading = false;
            this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
          }
        );
      },
      () => {
        this.itsLoading = false;
        this.utilService.openSnackBar('Error al consumir servicio', 'CERRAR', SnackbarType.ERROR);
      }
    );
  }


  abrirPago(pago: any) {
    console.log(pago)
    const dialogRef = this.dialog.open(ModalPagosComponent, {
      maxWidth: '700px',
      width: '700px',
      disableClose: true,
      data: {list: pago, multi: false},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.sharedService.sendClickEvent();
      this.buscar();
      if (result) {
      }
    });
  }

  abrirPagoMultiple() {
    const dialogRef = this.dialog.open(ModalPagosComponent, {
      maxWidth: '700px',
      width: '700px',
      disableClose: true,
      data: {list: this.listaCheckeada, multi: true},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.sharedService.sendClickEvent();
      this.buscar();
      if (result) {
      }
    });
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      company: [''],
      numeroDocumento: [''],
    });
  }

  get nit(): string | null {
    const nit = localStorage.getItem('nit');
    return nit ? nit : null;
  }
}
