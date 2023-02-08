import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { getMaskUserName } from './state/user.reducer';
import * as UserActions from './state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(private store: Store<any>, private authService: AuthService, private router: Router) { }
    // TODO: Unsubscribe
  ngOnInit(): void {
    this.store.select(getMaskUserName).subscribe(
      MaskUserName => {        
          this.maskUserName = MaskUserName;        
      }
    )
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(
      UserActions.maskUserName()
      );
    // this.maskUserName = !this.maskUserName;
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
