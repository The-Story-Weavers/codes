import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {stringify} from 'qs'
import { whiteList } from './commonConfig';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private whiteList :any= [];
  constructor(
    private httpClient: HttpClient,
    private router:Router,
    ) { 
      this.whiteList = whiteList
  }

  get(url: string, params?): Promise<any> {
    // url = "http://192.168.0.40:8180"+url
    return new Promise((resolve, reject) => {
      let header = new HttpHeaders();
      if(sessionStorage.getItem('token')) {
        header =  header.set('token', sessionStorage.getItem('token'))
      }

      this.httpClient.get(url, { params:params,headers: header }).toPromise().then((res) => {
        if (this.whiteList.filter(e => url.indexOf(e) !== -1).length > 0) {
          resolve(res);
        }
        if (res && res['code'] && res['code'] !== 200) {
          reject('接口报错');
        } else {
          resolve(res);
        }
      });
    });
  }

  //type不传得话默认是json格式；
  post(url: string, params, type?: 'json' | 'form'|'formData'): Promise<any> {
    // url = "http://192.168.0.40:8180"+url
    if (type === 'json' || !type) {
      return new Promise((resolve, reject) => {
        let header = new HttpHeaders();
        header =  header.set('Content-Type', 'application/json');
        if(sessionStorage.getItem('token')){
          header =  header.set('token', sessionStorage.getItem('token'))
        }
        this.httpClient.post(url, params, { headers: header })
          .toPromise().then((res) => {
            if (this.whiteList.filter(e => url.indexOf(e) !== -1).length > 0) {
              resolve(res);
            }
            if (res['code'] && res['code'] !== 200) {
              reject('接口报错');
            } else {
              resolve(res);
            }
          });
      });
    }
    if (type === 'form') {
      let formparams =stringify(params)
      return new Promise((resolve, reject) => {
        let header = new HttpHeaders();
        header =  header.set('Content-Type', 'application/x-www-form-urlencoded');
        if(sessionStorage.getItem('token')){
          header =  header.set('token', sessionStorage.getItem('token'))
        }
        this.httpClient.post(url, formparams, { headers: header})
          .toPromise().catch((e)=>{
            if(e.status==504 || e.status==401){            //超时后自动登出登录页
              sessionStorage.clear()
              this.router.navigate(['/login']);
            }
          }).then((res) => {
            if (this.whiteList.filter(e => url.indexOf(e) !== -1).length > 0) {
              resolve(res);
            }
            if (res['code'] && res['code'] !== 200) {
              reject('接口报错');
            } else {
              resolve(res);
            }
          });
      });
    }
    if (type === 'formData') {
      return new Promise((resolve, reject) => {
        let header = new HttpHeaders();
        if(sessionStorage.getItem('token')) {
          header =  header.set('token', sessionStorage.getItem('token'))
        }
        this.httpClient.post(url, params, { headers: header })
          .toPromise().catch((e)=>{
            if(e.status==504 || e.status==401){            //超时后自动登出登录页
              sessionStorage.clear()
              this.router.navigate(['/login']);
            }
          }).then((res) => {
            if (this.whiteList.filter(e => url.indexOf(e) !== -1).length > 0) {
              resolve(res);
            }
            if (res['code'] && res['code'] !== 200) {
              reject('接口报错');
            } else {
              resolve(res);
            }
          });
      });
    }
  }

}
