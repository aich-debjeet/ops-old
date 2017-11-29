import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './events.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { EventsInnerComponent } from './events-inner/events-inner.component';
import { EventsLandingComponent } from './events-landing/events-landing.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';


const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'create',
    component: EventsCreateComponent
  },
  {
    path: 'inner',
    component: EventsInnerComponent
  },
  {
    path: 'landing',
    component: EventsLandingComponent
  }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    NgxCarouselModule
  ],
  declarations: [
    EventsComponent,
    EventsCreateComponent,
    EventsInnerComponent,
    EventsLandingComponent
  ]
})
export class EventsModule { }
