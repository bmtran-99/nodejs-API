import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import * as Actions from 'src/app/ngrx/user.action';

interface LoginState {
  user: User;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  defaultUser = new User('', 'GUEST', '',);

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AngularFireAuth, private service: UserService, private router: Router, 
    private snackBar: MatSnackBar, private store: Store<LoginState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select('user');
    this.store.dispatch(Actions.GetUser({payload: this.defaultUser}));
  }

  loginWithGoogle() {
    this.store.dispatch(Actions.GoogleLogin());
  }

  loginWithFacebook() {
    this.store.dispatch(Actions.FacebookLogin());
  }

  onSubmit() {
    this.service.userLogin(this.loginForm.value).subscribe((data: any) => {
      let token = data.token;
      localStorage.setItem('Token', token);
      this.router.navigate(['/profile']);
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      if (err.error.msg) {
        this.snackBar.open(err.error.msg, 'Undo');
      } else {
        this.snackBar.open('Something Went Wrong..', '', {duration: 5000});
      }
    });
  }
}
