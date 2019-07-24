import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: any): any {
    return this.http.post('http://test-env.itwfvtde9t.us-east-2.elasticbeanstalk.com/api/authorization', user);
  }

  public regUser(user: any): any {
    return this.http.post('http://test-env.itwfvtde9t.us-east-2.elasticbeanstalk.com/api/registration', user);
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}