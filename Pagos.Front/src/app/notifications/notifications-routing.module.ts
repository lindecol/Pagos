import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { NotificationsComponent } from './notifications/notifications.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/notifications', pathMatch: 'full' },
    { path: 'notifications', component: NotificationsComponent, data: { title: marker('Notificaciones') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NotificationsRoutingModule {}
