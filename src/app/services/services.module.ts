import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';

@NgModule({
  providers: [
    ProfileService,
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule { }
