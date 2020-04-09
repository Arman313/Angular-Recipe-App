import { environment } from './../../environments/environment';

import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponseData{
  kind: string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({ providedIn: 'root'})

export class AuthService{

  user = new BehaviorSubject<User>(null);
  private tokenTime: any;

  constructor(private Http: HttpClient,private router: Router) { }


  signUp(email:string, password:string)
  {
   return this.Http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.fireBaseAPIKey,
    {email : email,password: password, returnSecureToken : true}).
    pipe(catchError(this.errorHandler),
    tap(resData=>{
      this.authHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn);}));
  }

  autoLogin()
  {

   const userData: 
   {
     email:string,
    id:string,
    _token:string,
    _tokenExp:string}
    = JSON.parse(localStorage.getItem('userInfo'));

   if(!userData) return;

   const loadedUser = new User(userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExp));

   if(loadedUser.token) this.user.next(loadedUser);
   
  const expireTime = new Date(userData._tokenExp).getTime()- new Date().getTime()
  this.autoLogOut(expireTime);
  }


  login(email:string,password:string){
    return this.Http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.fireBaseAPIKey,
    {email: email,
       password: password,
       returnSecureToken : true}).
       pipe(catchError(this.errorHandler),
       tap(resData=>{
      this.authHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }));
  }


  logOut(){
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/signin']);
    if(this.tokenTime) clearTimeout(this.tokenTime);
    this.tokenTime = null;
  }

  autoLogOut(expDur:number){
   this.tokenTime= setTimeout(()=>{
   this.logOut();
    },expDur);
  }


  private authHandler(email:string,userId:string,token:string,expiresIn:number){
    const expDate = new Date(new Date().getTime()+ expiresIn * 1000)
    const user = new User(email,userId,token,expDate);
   this.user.next(user);
   this.autoLogOut(expiresIn *1000);
   localStorage.setItem('userInfo',JSON.stringify(user));
  }


  private errorHandler(errorResponse: HttpErrorResponse){
    let errMsg ='Some error occurred';
    if(!errorResponse.error || !errorResponse.error.error.message){
      return throwError(errMsg)
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errMsg = 'Email Already Exsits';
        break
        case 'INVALID_PASSWORD':
          errMsg = 'Wrong password';
          break
          case 'EMAIL_NOT_FOUND':
            errMsg = 'Email was not found'
            break
    }
    return throwError(errMsg)
  }
}
