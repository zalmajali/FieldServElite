import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "https://www.fieldserv-elite.com/api";
  public result:any;
  constructor(private http:HttpClient) {
  }
  httpOptionsVal = {
    headers: new HttpHeaders({
      'appKey': '13930b192274c5799a04f285bfc9e275',
      'Content-Type': 'application/json'
    })
  }
  async login(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"login",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async forgotPassword(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"forgotPassword",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async employees(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"employees",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
