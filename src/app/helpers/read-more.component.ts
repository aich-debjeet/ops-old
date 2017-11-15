import { Component, Input, ElementRef, OnChanges} from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div>
            <p [innerHTML]="currentText" [class]="class"></p>
        </div>
            <a [class.hidden]="hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `,
    styles: [`
        a{
            cursor: pointer;
            color: #FF7B84;
        }
        .media-popup__text{
            margin: 10px 0;
            color: #333;
            font-weight: normal;
            line-height: 21px;
            font-size: 11px;
        }
        .media_channel--text{
            font-size: 12px;
        }
    `],
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() class: string;
    @Input() maxLength: number = 100;
    currentText: string;
    hideToggle: boolean = true;

    public isCollapsed: boolean = true;

    constructor(private elementRef: ElementRef) {

    }
    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }
    determineView() {
        if (this.text) {
            if (this.text.length <= this.maxLength) {
                this.currentText = this.text;
                this.isCollapsed = false;
                this.hideToggle = true;
                return;
            }
            this.hideToggle = false;
            if (this.isCollapsed === true) {
                this.currentText = this.text.substring(0, this.maxLength) + '...';
            } else if (this.isCollapsed === false)  {
                this.currentText = this.text;
            }
        }

    }
    ngOnChanges() {
        this.determineView();
    }
}
