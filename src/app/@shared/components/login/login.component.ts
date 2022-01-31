import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { I18nService } from 'ng-devui/i18n';
import { Subject } from 'rxjs';
import { DValidateRules } from 'ng-devui';

import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/services/auth.service';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { ThemeType } from '../../models/theme';
import { FormLayout } from 'ng-devui/form';
import { environment } from 'src/environments/environment';
import { Login } from '../../models/auth';
import { ToastService } from 'ng-devui/toast';

@Component({
  selector: 'da-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {


  tabActiveId: string | number = 'tab1';
  showPassword = false;
  horizontalLayout: FormLayout = FormLayout.Horizontal;

  toastMessage: any;


  formData = {
    userAccount: 'Admin',
    userAccountPassword: 'DevUI.admin',
    userEmail: 'admin@devui.com',
    userEmailPassword: 'devuiadmin'
  };

  loginFormData: Login = {
    username: "",
    password: "",
    rememberMe: true
  };

  formRules: { [key: string]: DValidateRules } = {
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 20 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: 'The user name cannot contain characters except uppercase and lowercase letters.',
        },
      ]
    },
    emailRules: {
      validators: [
        { required: true },
        { email: true },
      ],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
  };

  @HostListener('window:keydown.enter')
  onEnter() {
    this.login();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastService,
    private personalizeService: PersonalizeService
  ) {

  }

  ngOnInit(): void {

    this.personalizeService.setRefTheme(ThemeType.Default);


  }

  login() {

    console.log(this.loginFormData)
    this.authService.loginUser(this.loginFormData).subscribe(res => {
      if (res.result !== false) {
        this.authService.setSession(res);
        this.authService.sendAuthStateChangeNotification(res.result);
        this.router.navigate(['pages']);
      }
      else {

        this.toast.open({
          value: [{ severity: 'warn', summary: '', content: 'Username or Password is Incorrect' }],
        });
      }

    });
  }

  onKeyUp(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

}
