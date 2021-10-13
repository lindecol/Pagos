import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { PedidosRoutingModule } from '@app/pedidos/pedidos-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PedidosRoutingModule,
  ],
})
export class PedidosModule {}
