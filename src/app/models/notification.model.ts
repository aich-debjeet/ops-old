export class Notification {
    notificationId: string;
    notificationType: string;
    handle: string;
    name: string;
    profileImage: string;
    spotCount: number;
    commentsCount: number;
    isRead: boolean;
    createdDate: string;
    recieved_notifications: any[];
    requesting_notifications: boolean;
    requesting_notifications_success: boolean;
}
