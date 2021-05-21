import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { User } from "../models/user.model";
import * as UserActions from './user.action';
import { defaultUser } from "./user.reducer";
import { AngularFireAuth } from '@angular/fire/auth';
import { of, from } from "rxjs";
import { catchError, switchMap, map } from 'rxjs/operators';

import firebase from "firebase/app";

@Injectable()
export class UserEffects {
    constructor(private auth: AngularFireAuth, private action$: Actions) {}

    getUser$ = createEffect(() => this.action$.pipe(ofType(UserActions.GetUser), map(action => action.payload), 
        switchMap(payload => this.auth.authState), map(authData => {
            if (authData) {
                const user = new User(authData.email || '', authData.displayName || '', authData.photoURL || '');
                return UserActions.Authenticated({payload: user});
            }
            else {
                return UserActions.NotAuthenticated({payload: defaultUser});
            }
        }), 
            catchError(err => of(UserActions.AuthError()))
    ));

    loginWithGoogle = createEffect(() => this.action$.pipe(ofType(UserActions.GoogleLogin), map(action => action.payload),
        switchMap(payload => {
            return from(this.googleLogin());
        }), map(credential => {
            return UserActions.GetUser({payload: credential});
        })));

    loginWithFacebook = createEffect(() => this.action$.pipe(ofType(UserActions.FacebookLogin), map(action => action.payload),
        switchMap(payload => {
            return from(this.facebookLogin());
        }), map(credential => {
            return UserActions.GetUser({payload: credential});
        })));

    logout = createEffect(() => this.action$.pipe(ofType(UserActions.Logout), map(action => action.payload), 
        switchMap(payload => {
            return of(this.auth.signOut());
        }), map(authData => {
            return UserActions.NotAuthenticated({payload: authData});
        }), catchError(err => of(UserActions.AuthError())
        )));

    googleLogin() {
        return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookLogin() {
        return this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
}
