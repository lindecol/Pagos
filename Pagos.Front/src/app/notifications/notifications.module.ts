import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { SharedModule } from '@shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalNotificacionesComponent } from '@app/notifications/modal-notificaciones/modal-notificaciones.component';

@NgModule({
  declarations: [NotificationsComponent, ModalNotificacionesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    NotificationsRoutingModule,
  ],
  entryComponents: [ModalNotificacionesComponent],
})
export class NotificationsModule {}
