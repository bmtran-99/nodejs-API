import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { User } from "../models/user.model";
import * as UserActions from './user.action';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from "rxjs";
import { catchError, switchMap, map } from 'rxjs/operators';

import firebase from "firebase/app";

@Injectable()
export class UserEffects {
    constructor(private auth: AngularFireAuth, private action$: Actions) {}

    getUser$ = createEffect(() => this.action$.pipe(ofType(UserActions.GetUser), map(action => action.payload), 
        switchMap(payload => this.auth.authState), map(authData => {
            if (authData) {
                const user = new User(authData.email || '', authData.displayName || '', authData.photoURL || '');
                return new (UserActions.Authenticated as any)(user);
            }
            else {
                return new (UserActions.NotAuthenticated as any);
            }
        }), 
            catchError(err => of(new (UserActions.Authenticated() as any)))
    ));

    googleLogin() {
        return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
}
