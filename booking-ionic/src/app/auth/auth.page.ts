import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    private isLoadingF = false;
    public isLogin = true;
    constructor(private authService: AuthService,
                private router: Router,
                private loadingCont: LoadingController) {
    }
    ngOnInit() {
    }

    public login() {
        this.loadingCont.create({
           keyboardClose: true,
           message: 'Logging In....'
        }).then(loadingElement => {
            loadingElement.present().then();
            setTimeout(() => {
                this.isLoadingF = false;
                this.authService.login();
                loadingElement.dismiss().then();
                this.router.navigate(['']).then();
            }, 1000);
        });
        this.isLoadingF = true;
    }
    public isLoading(): boolean {
        return this.isLoadingF;
    }

    public onSubmit(f: NgForm) {
        console.log(f);
        if (!f.valid) {
            return;
        }
        const email = f.value.email;
        const password = f.value.password;
        console.log(email, password);
        if (this.isLogin) {
            // send request to login server
        } else {
            // send request to sign up server
        }
    }

    public onSwitchMode() {
        this.isLogin = !this.isLogin;
        //
    }
}
