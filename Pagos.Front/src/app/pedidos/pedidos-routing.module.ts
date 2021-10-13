import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { PedidosComponent } from '@app/pedidos/pedidos/pedidos.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
    { path: 'pedidos', component: PedidosComponent, data: { title: marker('Pedidos') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PedidosRoutingModule {}
