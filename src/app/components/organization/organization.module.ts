import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MasonryModule } from 'angular2-masonry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';

import { OrganizationRegComponent } from './organization-reg/organization-reg.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { OrgLeftblockComponent } from './organization-profile/org-leftblock/org-leftblock.component';
import { OrgChannelComponent } from './organization-profile/org-channel/org-channel.component';
import { OrgPostComponent } from './organization-profile/org-post/org-post.component';
import { OrgFeedComponent } from './organization-profile/org-feed/org-feed.component';
import { OrgCoverblockComponent } from './organization-profile/org-coverblock/org-coverblock.component';
import { OrgProfileComponent } from './organization-profile/org-profile/org-profile.component';
import { OrgAboutComponent } from './organization-profile/org-about/org-about.component';
import { OrgSettingsComponent } from './organization-profile/org-settings/org-settings.component';
import { OrgImageComponent } from './organization-profile/org-image/org-image.component';
import { OrgCoverComponent } from './organization-profile/org-cover/org-cover.component';

import { TagInputModule } from 'ngx-chips';

const childRoutes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: OrgProfileComponent,
    children: [
      { path: '', component: OrgChannelComponent },
      { path: 'channel', component: OrgChannelComponent },
      { path: 'post', component: OrgPostComponent },
      { path: 'spotfeed', component: OrgFeedComponent },
      { path: 'image-upload', component: OrgImageComponent },
      { path: 'cover-image', component: OrgCoverComponent }
    ]
  },
  {
    path: 'about',
    component: OrgAboutComponent,
  },
  // {
  //   path: 'settings',
  //   component: OrgSettingsComponent,
  // },
];

const routes: Routes = [
  {
    path: 'registration',
    component: OrganizationRegComponent
    // children: childRoutes,
  },
  {
    path: 'settings',
    component: OrgSettingsComponent,
  },
  {
    path: 'page',
    component: OrganizationProfileComponent,
    children: childRoutes
  },
  {
    path: 'p/:id',
    component: OrganizationProfileComponent,
    children: childRoutes
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ImageCropperModule,
    MasonryModule,
    TagInputModule,
    DpDatePickerModule
  ],
  declarations: [
    OrganizationRegComponent,
    OrganizationProfileComponent,
    OrgLeftblockComponent,
    OrgChannelComponent,
    OrgPostComponent,
    OrgFeedComponent,
    OrgCoverblockComponent,
    OrgProfileComponent,
    OrgAboutComponent,
    OrgSettingsComponent,
    OrgImageComponent,
    OrgCoverComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrganizationModule { }
