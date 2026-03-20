import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   backendUrl = environment.backendUrl;

  constructor(
    private httpService: HttpRequestService
  ) { }

  getUsers(dataTablesParameters:any):Observable<any>{
    return new Observable((observer)=>{
      observer.next([
        {name:'John', age:30},
        {name:'Doe', age:25},
        {name:'Smith', age:35}
      ]);
    });

  }

  // checkEmail(email: string): Observable<any> {
  //   return this.httpService.(`${this.backendUrl}api/check-email/${email}`);
  // }

}
