import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import { Constants } from './models/constants';
import { EmailPasswordCredentials } from './models/emailpasswordcredentials';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  authForm: FormGroup;
  error: any;
  isLoading = false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {


    if (this.authForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.emailPwpLogin(this.buildMailPasswordData()).then(
        success => {
          const authUser: any = success.user?.uid;
          this.isLoading = false;
            this.redirectToUserAccount(authUser);
         }, error => {
          this.error = this.authService.getError(error);
          this.spinner.hide();
          this.isLoading = false;
        });
    }

  }

  private redirectToUserAccount(authOwner: any) {
    window.localStorage.setItem(Constants.LOC_OWNER_AUTH_KEY, JSON.stringify(authOwner));
    this.authService.setKeyAuth(authOwner);
    this.router.navigate(['dashboard'])
  }

  private buildMailPasswordData(): EmailPasswordCredentials {
    const mailPw = new EmailPasswordCredentials();

    mailPw.email = this.authForm.get('username')?.value.trim();
    mailPw.password = this.authForm.get('password')?.value;
    return mailPw;
  }
}
