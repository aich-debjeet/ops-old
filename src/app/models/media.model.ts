export class Media {
  status_saved: boolean;
  status_uploaded = false;
  status_success = false;
  status_uploading = false;
  channel_detail?: ChanneDetails[];
  media_post_success? = false;
  user_posts: any;
  user_posts_loaded: boolean;
  user_posts_loading: boolean;
  media_detail: any;
  channel_loading: boolean;
}

export const initialMedia: Media = {
  status_saved: false,
  status_uploaded:  false,
  status_success: false,
  status_uploading: false,
  user_posts: [],
  user_posts_loaded: false,
  user_posts_loading: false,
  media_detail: [],
  channel_loading: false
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
export class ChanneDetails {
  channelName: string
}
