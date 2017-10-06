export class MessageModal {
    content?: string;
    sentAll: string[];
    receivedAll: string[];
    userProfileDetails: string[];
    receipients: String[];
    mergedMessages: String[];
    profileHandles: string[];
    receipients_loaded?: boolean 
}

export const initialMessage: MessageModal = {
    sentAll: [],
    receivedAll: [],
    receipients: [],
    userProfileDetails: [],
    mergedMessages: [],
    profileHandles: [],
};
