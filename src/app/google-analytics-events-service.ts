import { Injectable } from '@angular/core';

declare let ga;

@Injectable()
export class GoogleAnalyticsEventsService {

    public emitEvent(eventCategory: string,
        eventAction: string,
        eventLabel: string = null,
        eventValue: number = null) {
        ga('send', 'event', {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            eventValue: eventValue
        });
    }
}
