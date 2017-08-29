import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { MasonryModule } from 'angular2-masonry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileChannelComponent } from './profile-channel/profile-channel.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { ProfileSliderComponent } from './profile-slider/profile-slider.component';
import { ProfileBlockComponent } from './profile-block/profile-block.component';
import { ProfileAboutComponent } from './profile-about/profile-about.component';
import { AboutBioComponent } from './about-bio/about-bio.component';
import { AboutWorkComponent } from './about-work/about-work.component';
import { AboutAwardsComponent } from './about-awards/about-awards.component';
import { AboutEducationComponent } from './about-education/about-education.component';
import { AboutContactComponent } from './about-contact/about-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        component: ProfileBlockComponent,
        children: [
          { path: '', component: ProfileChannelComponent },
          { path: 'channel', component: ProfileChannelComponent },
          { path: 'post', component: ProfilePostComponent },
        ]
      },
      {
        path: 'about',
        component: ProfileAboutComponent,
        children: [
          { path: '', component: AboutBioComponent },
          { path: 'bio', component: AboutBioComponent },
          { path: 'work', component: AboutWorkComponent },
          { path: 'awards', component: AboutAwardsComponent },
          { path: 'education', component: AboutEducationComponent },
          { path: 'contact', component: AboutContactComponent }
        ]
      },
      //  { path: '', component: ProfileBlockComponent }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MasonryModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ],
  declarations: [
    ProfileComponent,
    ProfileChannelComponent,
    ProfilePostComponent,
    ProfileSliderComponent,
    ProfileBlockComponent,
    ProfileAboutComponent,
    AboutBioComponent,
    AboutWorkComponent,
    AboutAwardsComponent,
    ImageCropperComponent,
    AboutEducationComponent,
    AboutContactComponent
  ]
})
export class ProfileModule { }
