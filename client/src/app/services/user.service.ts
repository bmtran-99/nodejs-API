import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(payload: any) {
    return this.http.post(`${environment.baseURL}/api/users/register`, payload);
  }

  userLogin(payload: any) {
    return this.http.post(`${environment.baseURL}/api/users/login`, payload);
  }
  
  getProfile() {
    return this.http.get(`${environment.baseURL}/api/users/profile`);
  }
}
