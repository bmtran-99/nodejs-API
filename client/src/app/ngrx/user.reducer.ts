import * as Actions from "./user.action";
import { User } from "../models/user.model";

export const defaultUser = new User('', 'GUEST', '');

export function userReducer(state: User = defaultUser, action: any) {
    switch(action) {
        case Actions.GetUser:
            return {...state };
        
        case Actions.Authenticated:
            return {...state, ...action.payload};

        case Actions.NotAuthenticated:
            return {...state, ...defaultUser};

        case Actions.GoogleLogin:
            return {...state};

        case Actions.FacebookLogin:
            return {...state};

        case Actions.Logout:
            return {...state};

        case Actions.AuthError:
            return {...state, ...action.payload};
    }
}