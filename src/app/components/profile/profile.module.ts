import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { ProfileNetworkComponent } from './profile-network/profile-network.component'
import { AboutImageComponent } from './about-image/about-image.component';
import { AboutCoverComponent } from './about-cover/about-cover.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NguCarouselModule } from '@ngu/carousel';
import { AuthGuard } from './../../guard/auth.guard';
import { ProfileSpotfeedComponent } from './profile-spotfeed/profile-spotfeed.component';
import { ProfileNetworkRequestsComponent } from './profile-network-requests/profile-network-requests.component';
import { ProfileAcceptedRequestsComponent } from './profile-accepted-requests/profile-accepted-requests.component';
import { AboutAwardsFormComponent } from './forms/about-awards-form/about-awards-form.component';
import { AboutWorkFormComponent } from './forms/about-work-form/about-work-form.component';
import { AboutEducationFormComponent } from './forms/about-education-form/about-education-form.component';

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
      { path: '', redirectTo: 'post' },
      { path: 'channel', component: ProfileChannelComponent },
      { path: 'post', component: ProfilePostComponent },
      { path: 'spotfeed', component: ProfileSpotfeedComponent }
    ]
  },
  {
    path: 'about',
    component: ProfileAboutComponent,
    children: [
      { path: '', redirectTo: 'bio' },
      { path: 'image', component: AboutImageComponent },
      { path: 'cover_image', component: AboutCoverComponent },
      { path: 'bio', component: AboutBioComponent },
      { path: 'work', component: AboutWorkComponent },
      { path: 'awards', component: AboutAwardsComponent },
      { path: 'education', component: AboutEducationComponent },
      { path: 'contact', component: AboutContactComponent }
    ]
  },
  {
    path: 'network',
    component: ProfileNetworkComponent,
    children: [
      { path: '', redirectTo: 'networkrequests' },
      { path: 'acceptedrequests', component: ProfileAcceptedRequestsComponent },
      { path: 'networkrequests', component: ProfileNetworkRequestsComponent }
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
    NguCarouselModule,
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
    ProfileSpotfeedComponent,
    ProfileNetworkComponent,
    ProfileNetworkRequestsComponent,
    ProfileAcceptedRequestsComponent,
    AboutAwardsFormComponent,
    AboutWorkFormComponent,
    AboutEducationFormComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProfileModule { }
