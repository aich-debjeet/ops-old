import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dance-world-cup',
  templateUrl: './dance-world-cup.component.html',
  styleUrls: ['./dance-world-cup.component.scss']
})
export class DanceWorldCupComponent implements OnInit, AfterViewInit {

  navItem = '';
  activeTab = 'tab-3';
  contactForm: FormGroup;
  // window: Window;

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder
  ) {

    this.createContactForm();
  }

  ngOnInit() {
  }

  navigateTo(id: string) {
    this.navItem = id;
  }

  tabChange(tabId: string) {
    this.activeTab = tabId;
  }

  submitContactForm(value: any) {
    console.log(value);
    if (this.contactForm.valid) {
      console.log('submit valid form');
    } else {
      console.log('invalid form');
    }
  }

  /**
   * Submit contact form
   */
  createContactForm() {
    // Empty initiate form
    this.contactForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      message: ['']
    })
  }

  ngAfterViewInit() {
    // this.elRef.nativeElement.querySelector('a.btn-fb-share').addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    // const shareUrl = 'http://aurut.com';
    // console.log('called');
    // const windowObj = window.open();
    // let popUp;
    // if (shareUrl) {
    //   /** Open share dialog */
    //   popUp = window.open(shareUrl, 'newwindow', '800x800');
    // }
  }

}
