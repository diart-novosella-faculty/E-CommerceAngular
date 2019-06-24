import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { Product } from "src/models/product";
import { User } from "src/models/User";

@Injectable({
    providedIn:'root'
})

export class UserService{
    constructor(private http:HttpClient){}
    
    getUser(id):Observable<User>{
        //http://localhost:5001/api-admin/users/1
        return this.http.get<User>("http://localhost:5001/api-user/users/"+id);
    }

    updateUser(id:number,user:User){
        return this.http.put("http://localhost:5001/api-user/users/"+id,user);

    }
}