import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxMasonryModule } from 'ngx-masonry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
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

import { AboutImageComponent } from './about-image/about-image.component';
import { AboutCoverComponent } from './about-cover/about-cover.component';

import { ProfileHelper } from '../../helpers/profile.helper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgxCarouselModule } from 'ngx-carousel';
// import 'hammerjs';



// Guard
import { AuthGuard } from './../../guard/auth.guard';
import { ProfileSpotfeedComponent } from './profile-spotfeed/profile-spotfeed.component';

const childRoutes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: ProfileBlockComponent,
    children: [
      { path: '',  redirectTo: 'channel'},
      { path: 'channel', component: ProfileChannelComponent },
      { path: 'post', component: ProfilePostComponent },
      { path: 'spotfeed', component: ProfileSpotfeedComponent }
    ]
  },
  {
    path: 'about',
    component: ProfileAboutComponent,
    children: [
      { path: '', component: AboutBioComponent },
      { path: 'image', component: AboutImageComponent },
      { path: 'cover_image', component: AboutCoverComponent },
      { path: 'bio', component: AboutBioComponent },
      { path: 'work', component: AboutWorkComponent },
      { path: 'awards', component: AboutAwardsComponent },
      { path: 'education', component: AboutEducationComponent },
      { path: 'contact', component: AboutContactComponent }
    ]
  },
];

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: childRoutes,
    canActivate: [AuthGuard]
  },
  {
    path: 'u/:id',
    component: ProfileComponent,
    children: childRoutes,
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPipesModule,
    RouterModule.forChild(routes),
    NgxMasonryModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    ImageCropperModule,
    NgxCarouselModule,
    InfiniteScrollModule
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
    AboutEducationComponent,
    AboutContactComponent,
    AboutImageComponent,
    AboutCoverComponent,
    ProfileSpotfeedComponent
  ]
})
export class ProfileModule { }
