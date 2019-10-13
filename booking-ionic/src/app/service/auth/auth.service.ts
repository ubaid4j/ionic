import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isUserAuthenticated = false;
    constructor() { }
    public getIsUserAuth() {
        return this.isUserAuthenticated;
    }
    public login() {
        this.isUserAuthenticated = true;
    }
    public logout() {
        this.isUserAuthenticated = false;
    }
}
