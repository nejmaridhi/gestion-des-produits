import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Appuser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
users : Appuser[]=[];
authenticatedUser : Appuser | undefined;
  constructor() { 
 this.users.push({username:"user1",password:"1234", roles:["USER"] });
 this.users.push({username:"nejm",password:"0000", roles:["USER"] });
 this.users.push({username:"admin",password:"1234", roles:["USER","ADMIN"] });
} 
public login (username : string, password:string):Observable<Appuser>{
 let appUser = this.users.find(u=> u.username==username);
 if(!appUser) return throwError( new Error("user not found"));
 if (appUser.password!=password){
  return throwError( Error("password not found"));
 }
 return of(appUser);

}
public authenticateUser(appUser : Appuser):Observable<boolean>{
  this.authenticatedUser = appUser;
localStorage.setItem("authUser", JSON.stringify( {username:appUser.username , roles :appUser.roles, jwt:"JWT_TOKEN"}));
return of(true);
}

public hasRole(role : string): boolean{
  return this.authenticatedUser!.roles.includes(role);


}  
public isAuthenticated(){
  return this.authenticatedUser!=undefined;
}
public logout():Observable<boolean>{
  this.authenticatedUser=undefined;
localStorage.removeItem("authUser");
return of(true);
}
}

