import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthActions } from '../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  public contactUs: FormGroup;
  tagState$: Observable<any>;
  private subscription: ISubscription;
  sendingLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.tagState$ = this.store.select('loginTags');
    this.subscription = this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.sendingLoading = state['contact_sending_loading'];
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.buildForm()
  }

  buildForm() {
    this.contactUs = this.fb.group({
      'email' : [ '', [Validators.required, Validators.pattern('[^ @]*@[^ @]*') ]],
      'subject': ['', [Validators.required]],
      'message': ['', [Validators.required]],
    })

  }

  /**
   * Community Update
   */
  submitForm(value) {
    if ( this.contactUs.valid === true ) {
      const data = {
        contactEmail: value.email,
        contactSubject: value.subject,
        contactMessage: value.message
      }
      this.store.dispatch({ type: AuthActions.SEND_CONTACTUS, payload: data });

      this.store.select('loginTags')
      .first(contact => contact['contact_send_success'] === true)
      .subscribe( datas => {
        this.toastr.success('successfully Send', 'Success!');
        this.buildForm();
        return
      });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
