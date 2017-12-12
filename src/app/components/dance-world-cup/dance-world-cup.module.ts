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

const routes: Routes = [
  {
    path: '',
    component: DanceWorldCupComponent,
    children: [
      { path: '', redirectTo: 'dwc-indian-qualifiers'},
      { path: 'dwc-indian-qualifiers', component: DiqComponent},
      { path: 'dwc-official-website', component: DowComponent},
      { path: 'contact', component: ContactComponent}
    ]
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
    FormsModule

  ],
  declarations: [
    DanceWorldCupComponent,
    DiqComponent,
    DowComponent,
    ContactComponent
  ]
})
export class DanceWorldCupModule { }
