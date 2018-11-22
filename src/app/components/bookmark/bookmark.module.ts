import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookmarkComponent } from './bookmark.component';
import { BookmarkAudioComponent } from './bookmark-audio/bookmark-audio.component';
import { BookmarkEventComponent } from './bookmark-event/bookmark-event.component';
import { BookmarkImageComponent } from './bookmark-image/bookmark-image.component';
import { BookmarkOpportunityComponent } from './bookmark-opportunity/bookmark-opportunity.component';
import { BookmarkProfileComponent } from './bookmark-profile/bookmark-profile.component';
import { BookmarkVideoComponent } from './bookmark-video/bookmark-video.component';
import { BookmarkAllComponent } from './bookmark-all/bookmark-all.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { SharedModule } from 'app/shared/shared.module';
import { BookmarkAudioCardComponent } from './cards/bookmark-audio-card/bookmark-audio-card.component';
import { BookmarkImageCardComponent } from './cards/bookmark-image-card/bookmark-image-card.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: BookmarkComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: BookmarkAllComponent },
      { path: 'audio', component: BookmarkAudioComponent },
      { path: 'event', component: BookmarkEventComponent },
      { path: 'image', component: BookmarkImageComponent },
      { path: 'opportunity', component: BookmarkOpportunityComponent },
      { path: 'profile', component: BookmarkProfileComponent },
      { path: 'video', component: BookmarkVideoComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    BookmarkComponent,
    BookmarkAudioComponent,
    BookmarkEventComponent,
    BookmarkImageComponent,
    BookmarkOpportunityComponent,
    BookmarkProfileComponent,
    BookmarkVideoComponent,
    BookmarkAllComponent,
    BookmarkAudioCardComponent,
    BookmarkImageCardComponent
  ]
})
export class BookmarkModule { }
