import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService implements OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  // private token: string | null = null;
  // private secretKey = 'your_jwt_secret'; // Use a strong secret key

  // constructor(private http: HttpClient) { }

  // ngOnDestroy() {
  //   console.log('Service destroyed');
  // }

  // get(url: string, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.get(url, options);
  // }

  // post(url: string, body: any, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.post(url, body, options);
  // }

  // put(url: string, body: any, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.put(url, body, options);
  // }

  // delete(url: string, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.delete(url, options);
  // }

  // patch(url: string, body: any, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.patch(url, body, options);
  // }

  // upload(url: string, body: any, options?: any) {
  //   options = this.setHeaders(options);
  //   return this.http.post(url, body, options);
  // }

  // download(url: string, options?: any) {
  //   options = this.setHeaders(options, { responseType: 'blob' });
  //   return this.http.get(url, options);
  // }

  // private setHeaders(options: any = {}, additionalHeaders: any = {}) {
  //   const headers = new HttpHeaders({
  //     // 'Authorization': `${this.getToken()}`,
  //     'CurrentTimeStamp': new Date().getTime().toString(),
  //     'UTCOffset':  new Date().getTime() - new Date().getTimezoneOffset() * 60000,
  //     'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     'TimezoneOffset': new Date().getTimezoneOffset().toString(),
  //     'Language': navigator.language,
  //     ...additionalHeaders
  //   });
  //   if (this.getToken() !== null) {
  //     headers.set('Authorization',  this.getToken() || '');
  //   }

  //   options.headers = headers;
  //   return options;
  // }

  // private getToken(): string | null {
  //   if (!this.token) {
  //     const encryptedToken = localStorage.getItem('token');
  //     if (encryptedToken) {
  //       const token = this.decryptToken(encryptedToken);
  //       const decodedToken: any = jwtDecode(token);
  //       const currentTime = Math.floor(Date.now() / 1000);

  //       // Check if token is expired
  //       if (decodedToken.exp < currentTime) {
  //         console.log('Token is expired');
  //         localStorage.removeItem('token');
  //         this.token = null;

  //       } else {
  //         this.token = token;
  //       }
  //     }
  //   }
  //   return this.token;
  // }

  // private encryptToken(token: string): string {
  //   return CryptoJS.AES.encrypt(token, this.secretKey).toString();
  // }

  // private decryptToken(encryptedToken: string): string {
  //   const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // }


}
