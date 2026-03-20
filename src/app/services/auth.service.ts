import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { default as jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  // Add other properties expected in your token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:any;
  private secretKey = environment.secretKey; // Now using an environment variable

  constructor() {}

  getToken(): string | null {
    if (!this.token) {
      const encryptedToken = localStorage.getItem('token');
      if (encryptedToken) {
        try {
          const token = this.decryptToken(encryptedToken);
          const decodedToken: DecodedToken = jwtDecode.jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          // Check if token is expired
          if (decodedToken.exp < currentTime) {
            console.log('Token is expired');
            localStorage.removeItem('token');
            this.token = null;
          } else {
            this.token = token;
          }
        } catch (error) {
          console.error('Error decrypting token:', error);
          localStorage.removeItem('token');
          this.token = null;
        }
      }
    }
    return this.token;
  }

  setToken(token: string): void {
    try {
      const encryptedToken = this.encryptToken(token);
      localStorage.setItem('token', encryptedToken);
      this.token = token;
    } catch (error) {
      console.error('Error encrypting token:', error);
    }
  }

  private encryptToken(token: string): string {
    return CryptoJS.AES.encrypt(token, this.secretKey).toString();
  }

  private decryptToken(encryptedToken: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
