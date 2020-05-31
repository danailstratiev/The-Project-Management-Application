import {base_url, auth_url, Token, Logged_User} from '../utilities/constants';
import {LoggedUser} from '../utilities/types';
import UserService from './userService'; 

export default class AuthenticationService{

    public static async authenticate(username:string, password:string){
        const response: Response = await fetch(base_url + auth_url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        if (response && response.ok) {
            const result:any  = await response.json();
            const {token, userId, isAdmin} = result; 

            window.sessionStorage.setItem(Token, token);

            window.sessionStorage.setItem(Logged_User, JSON.stringify({
                id: userId,
                isAdmin: isAdmin
            }));
        }
    }

    public static getLoggedUser(): LoggedUser{
        return JSON.parse(window.sessionStorage.getItem(Logged_User));
    }

    public static logout(){
        window.sessionStorage.removeItem(Logged_User);
        window.sessionStorage.removeItem(Token);
    }

    public static getAuthorizationHeader() : string{
        return 'Bearer ' + window.sessionStorage.getItem(Token);
    }
}