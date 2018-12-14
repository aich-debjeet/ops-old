import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { SharedPipesModule } from 'app/pipes/shared-pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  { path: '', component: NotificationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPipesModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
