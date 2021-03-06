import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MessageComponent } from './message.component';

const routes: Routes = [
  { path: '', component: MessageComponent }
];

@NgModule({
  imports: [
    SharedPipesModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MessageComponent]
})
export class MessageModule { }
