export class MessageModal {
    content?: string;
    sentAll: string[];
    receivedAll: string[];
    userProfileDetails: string[];
    receipients: String[];
    mergedMessages: String[];
    profileHandles: string[];
    nonUserProfileDetails: string[];
    conversationDetails: string[];
    sendMessageResponse: string[];
    receipients_loaded: boolean;
    nonUserProfile2Details: string[];
    name: string[];
    markRead: boolean
}

export const initialMessage: MessageModal = {
    sentAll: [],
    receivedAll: [],
    receipients: [],
    userProfileDetails: [],
    mergedMessages: [],
    profileHandles: [],
    nonUserProfileDetails: [],
    conversationDetails: [],
    markRead: false,
    receipients_loaded: false,
    sendMessageResponse: [],
    nonUserProfile2Details: [],
    name: [],
};
