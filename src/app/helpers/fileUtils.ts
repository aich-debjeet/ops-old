/**
 * File utitlities
 */
import {Injectable} from '@angular/core';
import { find as _find } from 'lodash';

export default class FilesHelper {
  /**
   * Find stuff from an Array
   * @param group
   * @param exten
   */
  static checkGroup(group: String[], exten: string) {
    const res = _find(group, function(o) { return o === exten; });
    if (res) {
      return true;
    }else {
      return false
    }
  }

  /**
   * File Extension checker
   */
  static fileType(filename: string, fileGroup: string) {

    // List of Image files
    const ImageList = ['jpg', 'jpeg', 'png'];
    const VideoList = ['mp4', 'webm'];
    const AudioList = ['mp3'];

    const fileType = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    if (fileType && fileType[0]) {
      const fileExt = fileType[0];
      // Check if it falls to image
      if (fileGroup === 'Image') {
        return this.checkGroup(ImageList, fileExt);
      }

      // Check if it falls to image
      if (fileGroup === 'Video') {
        return this.checkGroup(VideoList, fileExt);
      }

      // Chekc if it
    }else {
      return false;
    }
  }
}
