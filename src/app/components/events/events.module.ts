import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './events.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsInnerComponent } from './events-inner/events-inner.component';
import { EventsLandingComponent } from './events-landing/events-landing.component';
import { NguCarouselModule } from '@ngu/carousel';
import { QuillModule } from 'ngx-quill';
import { SafeHtmlPipe } from '../../pipes/safehtml.pipe';
// import 'hammerjs';
import { EventsCarditemComponent } from './events-carditem/events-carditem.component';

import { HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


import { NgxfUploaderModule } from 'ngxf-uploader';


const routes: Routes = [
  {
    path: '',
    component: EventsLandingComponent
  },
  {
    path: 'create',
    component: EventsCreateComponent
  },
  {
    path: 'inner/:id',
    component: EventsInnerComponent
  },
  {
    path: ':id/edit',
    component: EventsCreateComponent
  }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NguCarouselModule,
    DpDatePickerModule,
    HttpClientModule,
    NgxfUploaderModule.forRoot(),
    QuillModule
  ],
  declarations: [
    EventsComponent,
    EventsCreateComponent,
    EventsInnerComponent,
    EventsLandingComponent,
    EventsCarditemComponent,
    SafeHtmlPipe
  ]
})
export class EventsModule { }
