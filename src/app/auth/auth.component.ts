import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent{

    userIcon = faUser;
    lock = faLock
    url:string;

    constructor(private authService : AuthService,private router: Router){
     
    }

    isLogin = true;
    isLoading = false;
    error = null;

    switchMode()
    {this.isLogin = !this.isLogin}

    onSubmit(formData : NgForm){
        
        const email =formData.value.email;
        const password = formData.value.password;

        if(this.isLogin){
            this.isLoading = true;
            this.authService.login(email,password).subscribe(res=>{
                this.isLoading = false;
                this.router.navigate(['/recipes']);
                this.url = '/recipes';
            },
            errMsg=>{
                this.error = errMsg
                this.isLoading= false;
                this.error = errMsg
            });
            
        }else{
            this.isLoading = true
            this.authService.signUp(email,password).subscribe(res=>{
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },errMsg=>{
                this.isLoading= false;
                this.error = errMsg
            });
        };
        formData.reset(); 
    }
}