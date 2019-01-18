import { ActionReducer, Action } from '@ngrx/store';
import { Media, initialMedia } from '../models/media.model';
import { MediaActions } from '../actions/media.action';

export const MediaReducer: ActionReducer<any> = (state = initialMedia, { payload, type }: Action) => {

  switch (type) {

    case MediaActions.CLEAR_VIEW_MEDIA:
      return Object.assign({}, state, {
        media_detail: {}
      });

    case MediaActions.MEDIA_BOOKAMRK_FLAG_UPDATE:
      return Object.assign({}, state, {
        media_detail: state.media_detail.extras === undefined ? { ...state.media_detail } : {
          ...state.media_detail,
          extras: {
            ...state.media_detail.extras,
            isBookmarked: payload.isBookmarked
          }
        }
      });

    case MediaActions.MEDIA_ADD_VIEW_COUNT:
      return Object.assign({}, state, {
        mediaUpdatingViewCount: true,
        mediaUpdatedViewCount: false,
        mediaUpdatedViewCountData: payload
      });

    case MediaActions.MEDIA_ADD_VIEW_COUNT_SUCCESS:
      return Object.assign({}, state, {
        mediaUpdatingViewCount: false,
        mediaUpdatedViewCount: true,
        mediaUpdatedViewCountResponse: payload
      });

    case MediaActions.MEDIA_ADD_VIEW_COUNT_FAILED:
      return Object.assign({}, state, {
        mediaUpdatingViewCount: false,
        mediaUpdatedViewCount: false
      });

    case MediaActions.STATUS_SAVE:
      return Object.assign({}, state, {
        status_saved: false
      });
    case MediaActions.STATUS_SAVE_SUCCESS:
      return Object.assign({}, state, {
        status_saved: true
      });

    case MediaActions.STATUS_SAVE_FAILED:
      return Object.assign({}, state, {
        status_saved: false,
        status_error: payload
      });

    case MediaActions.MEDIA_UPLOAD:
      return Object.assign({}, state, {
        uploaded: false,
        uploading: true
      });

    case MediaActions.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploaded: true,
        uploading: true,
        uploaded_files: payload
      });

    // Get single channel details
    case MediaActions.GET_CHANNEL_DETAILS:
      return Object.assign({}, state, {
        success: true,
        channel_loading: true,
        channel_loaded: false,
        channel_detail: []
      });

    case MediaActions.GET_CHANNEL_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        channel_loading: false,
        channel_loaded: true,
        channel_detail: payload
      });

    case MediaActions.GET_CHANNEL_DETAILS_FAILED:
      return Object.assign({}, state, {
        channel_loading: false,
        channel_loaded: false,
        success: false
      });

    // Get current channel post
    case MediaActions.GET_CURRENT_CHANNEL_POST:
      if (payload.scrollId === null) {
        return Object.assign({}, state, {
          channelPostScrollId: [],
          channel_post_loading: true,
          channel_post: []
        });
      }
      return Object.assign({}, state, {
        channel_post_loading: true,
      });


    case MediaActions.GET_CURRENT_CHANNEL_POST_SUCCESS:
      const channel_post = state.channel_post ? state.channel_post.concat(payload['mediaResponse']) : payload['mediaResponse'];
      return Object.assign({}, state, {
        channel_post_loading: false,
        channel_post: channel_post,
        postCount: payload['total'],
        channelPostScrollId: payload['scrollId']
      });

    // Get Media Details
    case MediaActions.MEDIA_DETAILS:
      return Object.assign({}, state, {
        media_detail_loading: true,
        media_detail: []
      });

    case MediaActions.MEDIA_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        media_detail_loading: false,
        media_detail: payload
      });

    case MediaActions.MEDIA_DETAILS_FAILED:
      return Object.assign({}, state, {
        media_detail_loading: false,
        media_detail_failed: true,
        media_detail: []
      });

    // Fetch Media comment
    case MediaActions.MEDIA_COMMENT_FETCH:
      return Object.assign({}, state, {
        media_comments_loading: true,
        media_comments_loaded: false,
        media_post_success: false,
        media_comment: []
      });

    case MediaActions.MEDIA_COMMENT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        media_comments_loading: false,
        media_comments_loaded: true,
        media_post_success: false,
        media_comment: payload
      });

    case MediaActions.MEDIA_COMMENT_FETCH_FAILED:
      return Object.assign({}, state, {
        media_comments_loading: false,
        media_comments_loaded: false,
      });

    case MediaActions.DELETE_COMMENT_SUCCESS:
      const spotfeed_del_post = state.channel_post.find(t => t.id === payload['mediaId']);
      const spotfeed_del_index = state.channel_post.indexOf(spotfeed_del_post);
      const spotfeed_del_count = spotfeed_del_post ? spotfeed_del_post.counts.commentsCount - 1 : 0;
      return Object.assign({}, state, {
        media_comment: state.media_comment ? state.media_comment.filter(comment => comment.commentsId !== payload.id) : [],
        channel_post: spotfeed_del_post === undefined ? [...state.channel_post] : [
          ...state.channel_post.slice(0, spotfeed_del_index),
          Object.assign({}, spotfeed_del_post, {
            counts: {
              ...spotfeed_del_post.counts,
              commentsCount: spotfeed_del_count
            }
          }),
          ...state.channel_post.slice(spotfeed_del_index + 1)
        ],
        media_detail: state.media_detail.extras === undefined ? { ...state.media_detail } : {
          ...state.media_detail,
          extras: {
            ...state.media_detail.extras,
            counts: {
              ...state.media_detail.extras.counts,
              commentsCount: state.media_detail.extras.counts.commentsCount - 1
            }
          }
        }
      });




    // Media comment success
    case MediaActions.POST_COMMENT:
      return Object.assign({}, state, {
        comment_post_loading: true,
        media_post_success: false
      });

    case MediaActions.POST_COMMENT_SUCCESS:
      const spotfeed_post = state.channel_post.find(t => t.id === payload['comment'].postId);
      const spotfeed_index = spotfeed_post ? state.channel_post.indexOf(spotfeed_post) : null;
      const spotfeed_count = spotfeed_post ? spotfeed_post.counts.commentsCount + 1 : 0;

      return Object.assign({}, state, {
        media_post_success: true,
        comment_post_loading: false,
        current_comment: payload['comment'],
        media_comment: state.media_comment ? state.media_comment.concat(payload['comment']) : [],
        channel_post: spotfeed_post === undefined ? [...state.channel_post] : [
          ...state.channel_post.slice(0, spotfeed_index),
          Object.assign({}, spotfeed_post, {
            counts: {
              ...spotfeed_post.counts,
              commentsCount: spotfeed_count
            }
          }),
          ...state.channel_post.slice(spotfeed_index + 1)
        ],
        media_detail: state.media_detail.extras === undefined ? { ...state.media_detail } : {
          ...state.media_detail,
          extras: {
            ...state.media_detail.extras,
            counts: {
              ...state.media_detail.extras.counts,
              commentsCount: state.media_detail.extras.counts.commentsCount + 1
            }
          }
        }
      });


    // API NOT READY FOR THIS
    case MediaActions.MEDIA_SPOT:
      const channel_media_spot = state.channel_post.find(t => t.id === payload.id);
      const channel_media_spot_index = channel_media_spot ? state.channel_post.indexOf(channel_media_spot) : null;
      const channel_media_spot_count = channel_media_spot ? channel_media_spot.counts.spotsCount + 1 : 0;

      return Object.assign({}, state, {
        channel_post: channel_media_spot === undefined ? [...state.channel_post] : [
          ...state.channel_post.slice(0, channel_media_spot_index),
          Object.assign({}, channel_media_spot, {
            isSpotted: true,
            counts: {
              ...channel_media_spot.counts,
              spotsCount: channel_media_spot_count
            }
          }),
          ...state.channel_post.slice(channel_media_spot_index + 1)
        ],
        media_detail: state.media_detail.extras === undefined ? { ...state.media_detail } : {
          ...state.media_detail,
          isSpotted: true,
          extras: {
            ...state.media_detail.extras,
            counts: {
              ...state.media_detail.extras.counts,
              spotsCount: state.media_detail.extras.counts.spotsCount + 1
            }
          }
        }
      });


    case MediaActions.MEDIA_UNSPOT:
      const channel_media_unspot = state.channel_post.find(t => t.id === payload.id);
      const channel_media_unspot_index = channel_media_unspot ? state.channel_post.indexOf(channel_media_unspot) : null;
      const channel_media_unspot_count = channel_media_unspot ? channel_media_unspot.counts.spotsCount - 1 : 0;

      return Object.assign({}, state, {
        channel_post: channel_media_unspot === undefined ? [...state.channel_post] : [
          ...state.channel_post.slice(0, channel_media_unspot_index),
          Object.assign({}, channel_media_unspot, {
            isSpotted: false,
            counts: {
              ...channel_media_unspot.counts,
              spotsCount: channel_media_unspot_count
            }
          }),
          ...state.channel_post.slice(channel_media_unspot_index + 1)
        ],
        media_detail: state.media_detail.extras === undefined ? { ...state.media_detail } : {
          ...state.media_detail,
          isSpotted: false,
          extras: {
            ...state.media_detail.extras,
            counts: {
              ...state.media_detail.extras.counts,
              spotsCount: state.media_detail.extras.counts.spotsCount - 1
            }
          }
        }
      });

    case MediaActions.POST_COMMENT_FAILED:
      return Object.assign({}, state, {
        comment_post_loading: false,
      });

    /**
     * Get User Media Post
     */
    case MediaActions.LOAD_USER_MEDIA:
      return Object.assign({}, state, {
        user_posts_loading: true,
        user_posts_loaded: false,
        // user_posts: []
      });

    case MediaActions.LOAD_USER_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        // mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: payload
      });

    case MediaActions.LOAD_USER_MEDIA_FAILED:

      return Object.assign({}, state, {
        user_posts_loaded: false,
        user_posts_loading: false
      });

    case MediaActions.LOAD_MY_MEDIA:
      if (payload.offset === 0) {
        return Object.assign({}, state, {
          my_media: []
        });
      }
      return Object.assign({}, state, {
        my_media_loading: false
      });


    case MediaActions.LOAD_MY_MEDIA_SUCCESS:
      const new_media = state.my_media.concat(payload)
      return Object.assign({}, state, {
        my_media: new_media
      });

    /**
     * MEDIA_POST_DELETE
     */
    case MediaActions.MEDIA_POST_DELETE:
      return Object.assign({}, state, {
        my_story: {
          ...state.my_story,
          media: state.my_story.media.filter(media => media.id != payload)
        },
      });

    case MediaActions.MEDIA_POST_DELETE_SUCCESS:
      return Object.assign({}, state, {
        media_delete_msg: payload.SUCCESS,
        channel_detail: {
          ...state.channel_detail,
          spotCount: state.channel_detail ? state.channel_detail.spotCount - 1 : null
        }
      });
    /**
     * Media_Edit
     */
    case MediaActions.MEDIA_EDIT_SUCCESS:
      return Object.assign({}, state, {
        media_edit_msg: payload.SUCCESS
      });

    case MediaActions.MEDIA_NEXT_SUCCESS:
      return Object.assign({}, state, {
        media_carousel: payload
      });

    /**
     * For getting my stories
     */
    case MediaActions.MY_STORY_GET:
      return Object.assign({}, state, {
        my_story: [],
        stories_loading: false
      });

    case MediaActions.MY_STORY_GET_SUCCESS:
      return Object.assign({}, state, {
        my_story: payload,
        stories_loading: true
      });

    case MediaActions.MY_STORY_GET_FAILED:
      return Object.assign({}, state, {
        stories_loading: false
      });

    /**
     * Reducer for post story
     */
    case MediaActions.MY_STORY_ADD:
      return Object.assign({}, state, {
        my_story_add_success: false
      });

    case MediaActions.MY_STORY_ADD_SUCCESS:
      return Object.assign({}, state, {
        my_story_add_success: true
      });

    default:
      return state;
  }
}

