import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(private http: HttpClient) { }
  public authorizationToken = ''
  public baseUrl = `${environment.backendApi}`

  // every 2 hour logougut and redirect to login page



  setCookie(name: string, value: string, expirationDays: number = 365, encrypt: boolean = true): void {
    const trimmedName = name.trim();
    const trimmedValue = value.trim();
    const encryptedValue = encrypt ? CryptoJS.AES.encrypt(trimmedValue, trimmedName).toString() : trimmedValue;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${trimmedName}=${encryptedValue}; ${expires}; path=/`;
    // set login time
    localStorage.setItem('loginTime', new Date().getTime().toString())

  }

  getCookie(name: string, decrypt: boolean = true, isObject: boolean = false): any {
    const trimmedName = name.trim();
    const cookieValue = this.getCookieValue(trimmedName);
    if (!cookieValue) return '';

    return decrypt ? this.decryptCookieValue(cookieValue, trimmedName, isObject) : cookieValue;
  }

  private getCookieValue(name: string): string | null {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(';');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) return cookieValue;
    }

    return null;
  }




  // Inside your component or service class
  public getUserInfoFromToken() {
    const token = this.getCookie('authorizationToken', true, true); // Decrypt and parse as object
    if (!token) return null; // Token not found or invalid

    // Assuming your token contains user information in JSON format
    const user = token; // Assuming 'user' is the key for user information in the token
    return user;
  }




  private decryptCookieValue(encryptedValue: string, key: string, isObject: boolean): any {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key);
    let decryptedValue: string | null = CryptoJS.enc.Utf8.stringify(decrypted)

    if (isObject) {
      try {
        decryptedValue = JSON.parse(decryptedValue);
      } catch (error) {
        console.error('Error parsing decrypted cookie value:', error);
        decryptedValue = null;
      }
    }

    return decryptedValue;
  }

  public setAuthorization(trueOrFalse: boolean = true) {
    let loginTime  = (localStorage.getItem('loginTime') || '')

    let currentTime = new Date().getTime()
    if(loginTime === undefined || loginTime === ''){
      this.deleteCookie('authorizationToken')
      window.location.href = 'login'
    }
    let diff = currentTime - parseInt(loginTime)
    let diffMinutes = Math.floor(diff)
    //
    // 2 hours
    if(diffMinutes >= 720000000){
      this.deleteCookie('authorizationToken')
      window.location.href = 'login'
    }
    this.authorizationToken = this.getCookie('authorizationToken', false);
    if(trueOrFalse ){

      if (localStorage.getItem('user') === null) {
      // logout user
      this.deleteCookie('authorizationToken')
      window.location.href = 'login'
      }

    }


  }




  get<T>(url: string = '', options: any = {}) {
    this.setAuthorization()
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authorizationToken);


    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('user', localStorage.getItem('user') || '');
    //

    return this.http.get<T>(`${this.baseUrl}${url}`, { params: options, headers: headers })
  }

  post<T>(url: string = '', body: any = {}, options: any = {}) {
    if(url !== '/login'){
    this.setAuthorization()
    }
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    headers = headers.set('user', localStorage.getItem('user') || '');

    return this.http.post<T>(`${this.baseUrl}${url}`, body, { params: options, headers: headers })
  }



  put<T>(url: string = '', body: any = {}, options: any = {}) {
    this.setAuthorization()
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { params: options, headers: headers })
  }

  delete<T>(url: string = '', options: any = {}) {
    this.setAuthorization()
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    headers = headers.set('user', localStorage.getItem('user') || '');

    return this.http.delete<T>(`${this.baseUrl}${url}`, { params: options, headers: headers })
  }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    // Optional: Add any other form data if needed

    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    headers = headers.set('user', localStorage.getItem('user') || '');



    return this.http.post(`${this.baseUrl}/upload`, formData, { headers });
  }

  getFile(url: string = '', options: any = {}) {
    this.setAuthorization()
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    headers = headers.set('user', localStorage.getItem('user') || '');

    return this.http.get(`${this.baseUrl}${url}`, { params: options, headers: headers, responseType: 'blob' })
  }



  deleteCookie(name: string): void {
    const trimmedName = name.trim();
    document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }


  postNoToken<T>(url: string = '', body: any = {}, options: any = {}) {

    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    headers = headers.set('Authorization', this.authorizationToken);
    headers = headers.set('user', localStorage.getItem('user') || '');

    return this.http.post<T>(`${this.baseUrl}${url}`, body, { params: options, headers: headers })
  }



  loginUser(username: string, password: string): Observable<any> {
    return this.post('/login', { username, password })
  }

  getMaterial(dataTablesParameters: any): Observable<any> {
    return this.post('/materials', dataTablesParameters)
  }

  getUsersList(dataTablesParameters: any): Observable<any> {
    return this.post('/mtrUsers', dataTablesParameters)
  }

  setMaterial(data: any): Observable<any> {
    return this.post('/saveMaterial', data)
  }

  setMaterialInd(data: any): Observable<any> {
    return this.post('/saveMaterialInd', data)
  }

  setUser(data: any): Observable<any> {
    return this.post('/saveUser', data)
  }

  deleteMaterial(data: any): Observable<any> {
    return this.post('/deleteMaterial', data)
  }
  deleteUser(data: any): Observable<any> {
    return this.post('/deleteUser', data)
  }

  getMaterialKey(data: any): Observable<any> {
    return this.post('/getMaterialKey', data)
  }


  getMaterialKeyDetail(data: any): Observable<any> {
    return this.post('/getMaterialKeyDetail', data)
  }

  getReportKeyDetail(data: any): Observable<any> {
    return this.post('/getReportKeyDetail', data)
  }

  getReportData(data: any): Observable<any> {
    return this.post('/getReportData', data)
  }

  // prashanthganji2021
  // Ganji@123
  // mongodb+srv://prashanthganji2021:<Ganji@123>@cluster0.bujzu.mongodb.net/

  saveReport(data: any): Observable<any> {
    return this.post('/saveReport', data)
  }

  getReportList(dataTablesParameters: any): Observable<any> {
    return this.post('/getReportList', dataTablesParameters)
  }

  getCoilTableList(dataTablesParameters: any): Observable<any> {
    return this.post('/getCoilTableList', dataTablesParameters)
  }

  deleteReport(data: any): Observable<any> {
    return this.post('/deleteReport', data)
  }

  getCoilList(data: any): Observable<any> {
    return this.post('/getCoilList', data)
  }

  getCoilDetail(data: any): Observable<any> {
    return this.post('/getCoilDetail', data)
  }

  saveCoil(data: any): Observable<any> {
    return this.post('/saveCoil', data)
  }

  deleteCoil(data: any): Observable<any> {
    return this.post('/deleteCoil', data)
  }

  // Optional: You can append additional form data here if needed

  // const headers = new HttpHeaders();
  // headers.set('Content-Type', 'multipart/form-data');
  // // Add any other headers required by your backend API

  // return this.http.post(`${this.baseUrl}/upload`, formData, { headers });
  exportAsExcelFile(excelFileName: string): void {
    this.getFile('/exportExcel', { excelFileName }).subscribe((response: any) => {
      // xlsx
      saveAs(response, excelFileName);
    }
    );
  }

  getAutocomplete(data: any): Observable<any> {
    return this.post('/getAutocomplete', data)
  }

  getAutocompleteReports(data: any): Observable<any> {
    return this.post('/getAutocompleteReports', data)
  }

  uploadFile(data: File): Observable<any> {
    return this.postFile(data)
  }

  public getUserInfo(data:any) {
    return this.get('/getUserInfo', data)
  }

  getAllIds(): Observable<any> {
    return this.get('/getAllIds')
  }

  uploadMaterialExcel(data: any): Observable<any> {
    return this.post('/uploadMaterialExcel', data)
  }

  getPreviousReport(data: any): Observable<any> {
    return this.post('/getPreviousReport', data)
  }

  getSimilarReports(data: any): Observable<any> {
    return this.post('/getSimilarReports', data)
  }

  copyData(data: any): Observable<any> {
    return this.post('/copyData', data)
  }


  sendEmail(data: any): Observable<any> {
    return this.post('/sendEmail', data)
  }

  saveEmailId(data: any): Observable<any> {
    return this.post('/saveEmailId', data)
  }

  getAllEmails(emailsender:any): Observable<any> {
    return this.get('/getAllEmails', emailsender)
  }

  checkEmail(data: any): Observable<any> {
    return this.postNoToken('/checkEmail', {data})
  }

  updateUserSettings(data: any): Observable<any> {
    return this.post('/updateUserSettings', data)
  }
  updateJobs(data: any): Observable<any> {
    return this.post('/updateJobs', data)
  }
  getJobsFromDatabase(data: any): Observable<any> {
    return this.post('/getJobsFromDatabase', data)
  }
  updateJobstatus(data: any): Observable<any> {
    return this.post('/updateJobstatus', data)
  }
  getLinkedInNumber(data: any): Observable<any> {
    return this.post('/getLinkedInNumber', data)
  }
  clearJobs(): Observable<any> {
    return this.post('/clearJobs')
  }
  saveCookieStorage(data: any): Observable<any> {
     let info = this.getUserInfoFromToken()
     let user = info.loginEmail
     data.user = user
    return this.post('/saveCookieStorage', data)
  }
  getCookieStorage(data: any): Observable<any> {
    return this.get('/getCookieStorage', data)
  }

  saveKeySetUp(data: any): Observable<any> {
    return this.post('/saveKeySetUp', data)
  }
  getKeySetUp(data: any): Observable<any> {
    return this.get('/getKeySetUp', data)
  }
}
