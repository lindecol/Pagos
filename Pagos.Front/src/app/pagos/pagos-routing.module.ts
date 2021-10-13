import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { PagosComponent } from '@app/pagos/pagos/pagos.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pagos', pathMatch: 'full' },
    { path: 'pagos', component: PagosComponent, data: { title: marker('Pagos') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PagosRoutingModule {}
