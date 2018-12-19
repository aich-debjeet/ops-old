import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div *ngIf="isEdit else notEditing;">
            <textarea
                [class]="class"
                [(ngModel)]="text"></textarea>
            <div class="c-media__edit-actions">
                <button type="button" class="btn btn-default btn-sm c-media-edit__cancel" (click)="onCancel()">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm c-media-edit__save" (click)="onContentSaved()">Save</button>
            </div>
        </div>
        <ng-template #notEditing>
            <p [innerHTML]="currentText" [class]="class"></p>
            <a class="text-label" [class.hidden]="hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
        </ng-template>
    `,
    styles: [`
        .text-label {
            font-size: 11px;
        }
        p {
            white-space: pre-line;
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
        .c-user__status {
            color: #333;
            font-size: 15px;
            line-height: 24px;
            word-wrap: break-word;
        }
        .c-feed__img-status {
            color: #333333;
            font-size: 16px;
            line-height: 23px;
            padding: 0 24px 16px 24px;
        }
        .c-media__edit-actions {
            width: 100%;
            padding: 10px 0;
            border-top: 1px solid #979797;
            text-align: right;
            float: left;
        }
        textarea {
            width: 100%;
            background: transparent;
            border: none;
            resize: none;
            height: 120px;
            padding: 0;
        }
        textarea::-webkit-scrollbar-track {
            background-color: #e5e5e5;
            border-radius: 5px;
        }
        textarea::-webkit-scrollbar {
            width: 8px;
            border-radius: 50px;
            background-color: #F3F5F7;
        }
        textarea::-webkit-scrollbar-thumb {
            background-color: #c1c1c1;
            border-radius: 50px;
        }
    `],
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() class: string;
    @Input() isEdit: boolean;
    @Input() maxLength = 100;
    @Output() contentEdited = new EventEmitter();
    @Output() cancelEdit = new EventEmitter();
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
        this.contentEdited.next(this.text);
    }

    ngOnChanges() {
        this.determineView();
    }

    onCancel() {
        this.cancelEdit.emit();
    }
}
