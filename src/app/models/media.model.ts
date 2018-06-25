export class Media {
  status_saved: boolean;
  status_uploaded = false;
  status_success = false;
  status_uploading = false;
  channel_detail?: any;
  media_post_success? = false;
  user_posts: any;
  user_posts_loaded: boolean;
  user_posts_loading: boolean;
  media_detail: any;
  media_comment?: any;
  channel_loading: boolean;
  my_media?: any;
  media_delete_msg?: String;
  media_edit_msg?: String;
  comment_post_loading?: boolean;
  reports: any[];
}

export const initialMedia: Media = {
  status_saved: false,
  status_uploaded:  false,
  status_success: false,
  channel_detail: [],
  status_uploading: false,
  user_posts: [],
  user_posts_loaded: false,
  user_posts_loading: false,
  media_detail: [],
  channel_loading: false,
  comment_post_loading: false,
  reports: []
};

// export class MediaFile {
//   fileName: string;
//   repoPath: string;
//   mtype: string;
//   contentType: string;
//   title: string;
//   description: string;
//   active: boolean;
//   createdBy: string;
//   createdDate: string;
//   lastUpdatedDate: string;
//   count : {
//      likes: [], shares: [], spots: [],
//     channel: chosenChannel.spotfeedId
//   }
// }]
export class ChannelDetails {
  channelName: string
}
