import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

import FilesHelper from '../../helpers/fileUtils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  @Input() artist;
  @Output() onFollow: EventEmitter<any> = new EventEmitter<any>();
  isFollowing: boolean;
  userImage: string;
  baseUrl: string = environment.API_IMAGE;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isFollowing = false;
  }

  ngOnInit() {
    if (!this.artist.ownerImage) {
      console.log('not there');
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.baseUrl + this.artist.ownerImage;
    }
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
    console.log('Deleting this Channenl');
  }

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  followUser() {
    //
  }

  disableFollowForSelf() {
    return false;
  }
}
