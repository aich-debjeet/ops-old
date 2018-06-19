import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { MediaComponent } from './media.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


// Childs
import { BlogEditorComponent } from './blog-editor/blog-editor.component';
import { StatusEditorComponent } from './status-editor/status-editor.component';
import { MediaSelectorComponent } from './media-selector/media-selector.component';
import { ChannelSelectorComponent } from './channel-selector/channel-selector.component';
import { MediaViewComponent } from './media-view/media-view.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { EditChannelComponent } from './channel-edit/channel-edit.component';
import { ChannelListComponent } from './channel-list/channel-list.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NgxfUploaderModule } from 'ngxf-uploader';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UtcDatePipe } from './../../pipes/utcdate.pipe';
import { SharedPipesModule } from './../../pipes/shared-pipes.module';

const routes: Routes = [
  {
    path: 'post',
    component: MediaComponent,
    children: [
      {
        path: '',
        redirectTo: 'media',
        pathMatch: 'full'
      },
      {
        path: 'status',
        component: StatusEditorComponent
      },
      {
        path: 'media',
        component: MediaSelectorComponent
      },
      {
        path: 'blog',
        component: BlogEditorComponent
      },
    ]
  },
  {
    path: 'media/:id',
    component: MediaViewComponent,
    outlet: 'media'
  },
  {
    path: 'channel/add',
    component: CreateChannelComponent,
    outlet: 'media'
  },
  {
    path: 'channel/:id/edit',
    component: EditChannelComponent,
    outlet: 'media'
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgxfUploaderModule.forRoot(),
    FormsModule,
    TagInputModule,
    SharedPipesModule,
    BrowserAnimationsModule,
    InfiniteScrollModule
  ],
  declarations: [
    MediaComponent,
    MediaViewComponent,
    BlogEditorComponent,
    StatusEditorComponent,
    MediaSelectorComponent,
    ChannelSelectorComponent,
    CreateChannelComponent,
    EditChannelComponent,
    ChannelListComponent
  ],
  exports: [
    MediaComponent,
  ]
})

export class MediaModule { }
