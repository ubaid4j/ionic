import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    private isLoadingF = false;
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
}
