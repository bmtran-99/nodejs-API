import { createAction, props } from "@ngrx/store";

export const GetUser = createAction('[Auth] Get user', props<{payload: any}>());
export const Authenticated = createAction('[Auth] Authenticated');
export const NotAuthenticated = createAction('[Auth] Not Authenticated');
export const GoogleLogin = createAction('[Auth] Google login attempt');
export const FacebookLogin = createAction('[Auth] Facebook login attempt');
export const Logout = createAction('[Auth] Logout');
export const AuthError = createAction('[Auth] Error');