import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AngularFireAuth, private service: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
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
        this.snackBar.open('Something Went Wrong!', '', {duration: 5000});
      }
    });
  }
}
