import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxMasonryModule } from 'ngx-masonry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';

import { OrganizationRegComponent } from './organization-reg/organization-reg.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';

import { SharedModule } from '../../shared/shared.module';
import { OrgCoverblockComponent } from './organization-profile/org-coverblock/org-coverblock.component';
import { OrgAboutComponent } from './organization-profile/org-about/org-about.component';
import { OrgImageComponent } from './organization-profile/org-image/org-image.component';
import { OrgCoverComponent } from './organization-profile/org-cover/org-cover.component';

import { TagInputModule } from 'ngx-chips';

const childRoutes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: OrgAboutComponent,
    children: [
      { path: 'profile-image', component: OrgImageComponent },
      { path: 'cover-image', component: OrgCoverComponent }
    ]
  }
];

const routes: Routes = [
  {
    path: 'registration',
    component: OrganizationRegComponent
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
    NgxMasonryModule,
    TagInputModule,
    DpDatePickerModule
  ],
  declarations: [
    OrganizationRegComponent,
    OrganizationProfileComponent,
    OrgCoverblockComponent,
    OrgAboutComponent,
    OrgImageComponent,
    OrgCoverComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrganizationModule { }
