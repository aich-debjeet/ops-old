export class Media {
  status_uploaded = false;
  status_success = false;
  status_uploading = false;
  channel_detail?: ChanneDetails[];
}

export const initialMedia: Media = {
  status_uploaded:  false,
  status_success: false,
  status_uploading: false
};

export class ChanneDetails {
  channelName: string
}
