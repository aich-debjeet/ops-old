import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      { path: 'channel', component: OrgPostComponent },
      { path: 'post', component: OrgPostComponent },
      { path: 'spotfeed', component: OrgFeedComponent }
    ]
  },
  {
    path: 'about',
    component: OrgAboutComponent,
  },
  {
    path: 'settings',
    component: OrgSettingsComponent,
  },
];

// const childRoutes = [
//   {
//     path: '',
//     redirectTo: 'user',
//     pathMatch: 'full'
//   },
//   {
//     path: 'user',
//     component: ProfileBlockComponent,
//     children: [
//       { path: '', component: OrgChannelComponent },
//       { path: 'channel', component: OrgChannelComponent },
//       { path: 'post', component: ProfilePostComponent },
//       { path: 'spotfeed', component: ProfileSpotfeedComponent }
//     ]
//   },
//   // {
//   //   path: 'about',
//   //   component: ProfileAboutComponent,
//   //   children: [
//   //     { path: '', component: AboutBioComponent },
//   //     { path: 'image', component: AboutImageComponent },
//   //     { path: 'cover_image', component: AboutCoverComponent },
//   //     { path: 'bio', component: AboutBioComponent },
//   //     { path: 'work', component: AboutWorkComponent },
//   //     { path: 'awards', component: AboutAwardsComponent },
//   //     { path: 'education', component: AboutEducationComponent },
//   //     { path: 'contact', component: AboutContactComponent }
//   //   ]
//   // },
// ];

const routes: Routes = [
  {
    path: 'registration',
    component: OrganizationRegComponent
    // children: childRoutes,
  },
  {
    path: 'page',
    component: OrganizationProfileComponent,
    children: childRoutes
  },
  // {
  //   path: 'u/:id',
  //   component: ProfileComponent,
  //   children: childRoutes,
  // }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
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
    OrgSettingsComponent
  ]
})
export class OrganizationModule { }
