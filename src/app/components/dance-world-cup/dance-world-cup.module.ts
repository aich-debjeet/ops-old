import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DanceWorldCupComponent } from './dance-world-cup.component';
import { SharedModule } from '../../shared/shared.module';
import { DiqComponent } from './diq/diq.component';
import { DowComponent } from './dow/dow.component';
import { ContactComponent } from './contact/contact.component';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { NgxCarouselModule } from 'ngx-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DwcProgressBarComponent } from './dwc-progress-bar/dwc-progress-bar.component';
import { DwcPaymentComponent } from './dwc-payment/dwc-payment.component';
import { DwcSuccessComponent } from './dwc-success/dwc-success.component';
import { DwcRegComponent } from './dwc-reg/dwc-reg.component';
import { DwcCompletedComponent } from './dwc-completed/dwc-completed.component';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
  {
    path: 'details',
    component: DanceWorldCupComponent,
  },
  {
    path: 'reg',
    component: DwcRegComponent,
  },
  {
  path: 'payment',
  component: DwcPaymentComponent,
  },
  {
    path: 'success',
    component: DwcSuccessComponent,
  },
  {
    path: 'completed',
    component: DwcCompletedComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ShareButtonsModule,
    NgxCarouselModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule

  ],
  declarations: [
    DanceWorldCupComponent,
    DiqComponent,
    DowComponent,
    ContactComponent,
    DwcProgressBarComponent,
    DwcPaymentComponent,
    DwcSuccessComponent,
    DwcRegComponent,
    DwcCompletedComponent
  ]
})
export class DanceWorldCupModule { }
