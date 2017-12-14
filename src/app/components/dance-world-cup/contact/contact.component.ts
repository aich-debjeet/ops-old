import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EventModal, initialTag  } from '../../../models/event.model';
import { Store } from '@ngrx/store';
import { EventActions } from 'app/actions/event.action';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contactFormState$: any;
  contactFormState: any;
  formSubmitted = false;
  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store: Store<EventModal>,
  ) {

    this.createContactForm();

    this.contactFormState$ = this.store.select('eventTags');
    this.contactFormState$.subscribe(state => {
      this.contactFormState = state;
      // console.log(this.contactFormState);

      // check if form is submitted
      if (this.formSubmitted && this.contactFormState && this.contactFormState.dwc_contact_form_upload_success === true) {
        // console.log();
        this.toastr.success('Your details has been submitted successfully');
        this.resetContactForm();
      }
    });
  }

  ngOnInit() {
  }

  submitContactForm(value: any) {
    // console.log(value);
    if (this.contactForm.valid) {
      this.formSubmitted = true;

      const reqBody = {
        contactName: value.name,
        contactPhone: '',
        contactEmail: value.email,
        contactSubject: value.message
      };
      this.store.dispatch({ type: EventActions.DWC_CONTACT_FORM, payload: reqBody });
    }
  }

  /**
   * Reset form
   */
  resetContactForm() {
    // Empty initiate form
    this.contactForm = this.fb.group({
      name: [null],
      email: [null],
      message: [null]
    })
  }

  /**
   * Submit contact form
   */
  createContactForm() {
    // Empty initiate form
    this.contactForm = this.fb.group({
      name: [null, Validators.required ],
      email: [null, Validators.required ],
      message: [null]
    })
  }

}
