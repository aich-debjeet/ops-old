import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'create',
    component: EventsCreateComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    EventsComponent,
    EventsCreateComponent
  ]
})
export class EventsModule { }
