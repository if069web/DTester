import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {User} from "./../shared/classes/user";
import {LoginService} from "./../shared/services/login.service";

@Component({
    selector: "login-form",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"],
    providers: [LoginService]
})

export class LoginComponent {

    public user:User = new User();
    public loginMessage:boolean = false;

    constructor(private _loginService:LoginService,
                private _router:Router) {
    }

    onSubmit():void {
        this._loginService.login(this.user)
            .then((response:any)=> {
                if (response.roles && (response.roles[1] === "student")) {
                    this._router.navigate(["/student"]);
                } else if (response.roles && (response.roles[1] === "admin")) {
                    this._router.navigate(["/admin"]);
                } else {
                    this.loginMessage = true;
                }
            })
            .catch((error:any)=> {
                console.log("$$$ " + error.response);
                if (error.response === "Invalid login or password") {
                    this.loginMessage = true;
                }
            });
    }

    delWarning():void {
        this.loginMessage = false;
    }
}
