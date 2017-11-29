import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { OrganizationService } from '../services/organization.service';
import { EventService } from '../services/event.service';

@NgModule({
  providers: [
    ProfileService,
    OrganizationService,
    EventService
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule { }
