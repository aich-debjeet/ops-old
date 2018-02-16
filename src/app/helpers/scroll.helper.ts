import { Injectable } from '@angular/core';

@Injectable()
export class ScrollHelper {
    private classToScrollTo: string = null;

    constructor() { }

    scrollToFirst(className: string) {
        this.classToScrollTo = className;
    }

    doScroll() {
        if (!this.classToScrollTo) {
            return;
        }
        try {
            const elements = document.getElementsByClassName(this.classToScrollTo);
            if (elements.length === 0) {
                return;
            }
            elements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        finally {
            this.classToScrollTo = null;
        }
    }
}
