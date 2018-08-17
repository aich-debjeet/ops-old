import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { InvitePeopleComponent } from './invite-people.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '',
    component:  InvitePeopleComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InvitePeopleComponent
  ]
})
export class InvitePeopleModule { }
