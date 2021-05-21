import { createAction, props } from "@ngrx/store";

export const GetUser = createAction('[Auth] Get user', props<{payload: any}>());
export const Authenticated = createAction('[Auth] Authenticated', props<{payload: any}>());
export const NotAuthenticated = createAction('[Auth] Not Authenticated', props<{payload: any}>());
export const GoogleLogin = createAction('[Auth] Google login attempt', props<{payload: any}>());
export const FacebookLogin = createAction('[Auth] Facebook login attempt', props<{payload: any}>());
export const Logout = createAction('[Auth] Logout', props<{payload: any}>());
export const AuthError = createAction('[Auth] Error');