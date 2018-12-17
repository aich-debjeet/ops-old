import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div>
            <p *ngIf="!isEdit" [innerHTML]="currentText" [class]="class"></p>
            <p contenteditable="true" *ngIf="isEdit" [textContent]="text" [(ngModel)]="text" [class]="class" ngDefaultControl (keyup.enter)="onContentSaved()" (input)="text=$event.target.textContent" [ngClass]="{'fill_grey': isEdit}"></p>
        </div>
        <a class="text-label" [class.hidden]="hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `,
    styles: [`
        .text-label {
            font-size: 11px;
        }
        a {
            cursor: pointer;
            color: #FF7B84;
        }
        .media-popup__text {
            margin: 10px 0;
            color: #333;
            font-weight: normal;
            line-height: 21px;
            font-size: 11px;
        }
        .media_channel--text {
            font-size: 12px;
        }
        .fill_grey {
            color: #979797;
            font-weight: 600;
            display: inline;
        }
        .c-user__status {
            color: #333;
            font-size: 15px;
            line-height: 24px;
        }
        .c-feed__img-status {
            color: #333333;
            font-size: 16px;
            line-height: 23px;
            padding: 0 24px 16px 24px;
        }
    `],
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() class: string;
    @Input() isEdit: boolean;
    @Input() maxLength = 100;
    @Output() commentEdited = new EventEmitter();
    currentText: string;
    hideToggle = true;
    public isCollapsed = true;

    // constructor(private elementRef: ElementRef) {}
    constructor() { }

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
            } else if (this.isCollapsed === false) {
                this.currentText = this.text;
            }
        }

    }

    onContentSaved(content) {
        this.isEdit = false;
        this.commentEdited.next(this.text);
    }

    ngOnChanges() {
        this.determineView();
    }
}
