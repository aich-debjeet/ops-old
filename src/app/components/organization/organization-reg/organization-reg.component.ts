import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-organization-reg',
  templateUrl: './organization-reg.component.html',
  styleUrls: ['./organization-reg.component.scss']
})
export class OrganizationRegComponent implements OnInit {

  public orgReg: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  // Init Reg Form
  buildForm() {
    this.orgReg = this.fb.group({
      'org_name' : ['', [Validators.required]],
      'org_username' : ['', [
        Validators.required,
        // FormValidation.noWhitespaceValidator
        ],
        // this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      'org_type': ['', Validators.required],
    //   'dob' : ['', [Validators.required],
    //     this.databaseValidator.validAge.bind(this.databaseValidator)
    //   ],
    //   'email' : ['', [
    //     Validators.required,
    //     Validators.min(1),
    //     // Validators.email
    //     FormValidation.validEmail
    //     ],
    //     this.databaseValidator.checkEmail.bind(this.databaseValidator)
    //   ],
    //   'gender': ['M', Validators.required],
    //   'phone' : ['', [
    //     Validators.required,
    //     Validators.minLength(4)
    //     ],
    //     this.databaseValidator.checkMobile.bind(this.databaseValidator)
    //   ],
    //   'password' : ['', [
    //     Validators.required,
    //     FormValidation.passwordStrength.bind(this)
    //   ]],
    //   'confirmpassword' : ['', [
    //     Validators.required,
    //     this.passwordMatchCheck.bind(this)
    //   ]],
    // });

    // // OTP Form Builder
    // this.otpForm = this.fb.group({
    //   'otpNumber': ['', [
    //       FormValidation.validOtp.bind(this)
    //     ],
    //   ]
    // })

    // // OTP new number
    // this.newNumberForm = this.fb.group({
    //   'newNumber': ['', [
    //       Validators.required,
    //       Validators.minLength(4)
    //     ],
    //     this.databaseValidator.checkMobile.bind(this.databaseValidator)
    //   ]
    })
  }

  submitForm(value) {
    console.log(value);    
  }

}
