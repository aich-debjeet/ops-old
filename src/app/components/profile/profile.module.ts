import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileChannelComponent } from './profile-channel/profile-channel.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';

const routes: Routes= [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfileChannelComponent },
      { path: 'channel', component: ProfileChannelComponent},
      { path: 'post', component: ProfilePostComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfileComponent,
    ProfileChannelComponent,
    ProfilePostComponent
  ]
})
export class ProfileModule { }
