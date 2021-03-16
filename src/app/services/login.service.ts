import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = "http://127.0.0.1:5000";
  constructor(
    private http: HttpClient
  ) { }

  checkUsername(username) {
    let params = new HttpParams();
    params = params.append('displayname', username);
    return this.http.get(this.baseurl + '/checkdispname', {params: params});
  }
}
