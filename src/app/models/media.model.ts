export class Media {
  status_uploaded = false;
  status_success = false;
  status_uploading = false;
}

export const initialMedia: Media = {
  status_uploaded:  false,
  status_success: false,
  status_uploading: false
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
