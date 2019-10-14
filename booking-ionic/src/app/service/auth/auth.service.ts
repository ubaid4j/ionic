import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tslint:disable-next-line:variable-name
    private _userId = 'abc';

    private isUserAuthenticated = true;
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
    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

}
