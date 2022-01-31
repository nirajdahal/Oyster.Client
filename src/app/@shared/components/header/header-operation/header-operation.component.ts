import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/@core/services/auth.service';

import { User } from '../../../models/user';
import { I18nService } from 'ng-devui/i18n';

@Component({
  selector: 'da-header-operation',
  templateUrl: './header-operation.component.html',
  styleUrls: ['./header-operation.component.scss'],
})
export class HeaderOperationComponent implements OnInit {
  user: User;

  haveLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,


  ) { }
  userName: string = ""
  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.userName = this.authService.getCurrentUserName();
      this.haveLoggedIn = true;
    } else {
      this.router.navigate(['pages']);
    }


    this.authService.authChanged
      .subscribe((res: boolean) => {
        console.log(res, "res")
      })

  }

  onSearch(event: any) {
    console.log(event);
  }



  handleUserOps(operation: string) {
    switch (operation) {
      case 'logout': {
        this.haveLoggedIn = false;
        this.authService.logout();
        this.router.navigate(['/', 'login']);
        break;
      }
      default:
        break;
    }
  }
}
