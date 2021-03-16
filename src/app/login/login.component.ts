import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UsernameValidator } from '../validators/username';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid = false;
  message = '';
  loginForm: FormGroup;
  @ViewChild('lform') loginFormDirective;
  
  constructor(
    private loginFormBuilder: FormBuilder,
    private loginService: LoginService,
    public usernameValidator: UsernameValidator,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  formErrors = {
    'username': '',
  };


  validationMessages = {
    'username': {
      'required': 'Username is required',
      'minlength': 'Last Name must be at least 3 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.',
      'checkUsername': 'Username Taken'
    },
  }

  createForm(): void {
    this.loginForm = this.loginFormBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)]), this.usernameValidator.checkUsername.bind(this.usernameValidator)],
    });true

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  checkDispname(displayname) {
    console.log(displayname);
    this.loginService.checkUsername(displayname)
      .subscribe( response => {
        console.log(response);
        if (response['available'] == false) {
          this.invalid = true;
          this.message += response['msg'];
          console.log(this.message);
        } else {
          this.invalid = false;
        }
      })
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {

        // clear previous error messages
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
