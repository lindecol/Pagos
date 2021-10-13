import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {PagosRoutingModule} from '@app/pagos/pagos-routing.module';
import {PagosComponent} from './pagos/pagos.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ModalPagosComponent} from '@app/pagos/pagos/modal-pagos/modal-pagos.component';
import {CdkTableModule} from '@angular/cdk/table';
@NgModule({
  declarations: [PagosComponent, ModalPagosComponent],
  entryComponents: [ModalPagosComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    CdkTableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PagosRoutingModule,
  ],
})
export class PagosModule {
}
