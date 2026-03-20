import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonService } from '../http-common.service';
import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgToastService } from 'ng-angular-popup';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPasswordbox = false;
  email: string = '';
  password: string = '';
  showLogin = false;
  
  constructor(
    private router: Router,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private httpCommonService: HttpCommonService,

  ) { }

  ngOnInit(): void {
  }


  checkEmail() {
    this.spinner.show();
    if (this.email) {
      this.httpCommonService.checkEmail(this.email).subscribe((res: any) => {
        if (res?.data?._id) {
          this.showPasswordbox = true;
          this.spinner.hide();
        } else {
          this.showAlert('Email not found');
          this.spinner.hide();
        }
      }, (error: any) => {
        this.showAlert('Email not found');
        this.spinner.hide();
      });
      // this.showPasswordbox = true;
    } else {
      this.showAlert('Please enter email');
      this.spinner.hide();
    }


  }
  showSpinner = false;
  login() {
    if (this.email && this.password) {
      // alert('Login successful');
      // this.router.navigate(['/dashboard']);
      // loginUser(username: string, password: string): Observable<any> {
      //   return this.post('/login', { username, password })
      // }
      this.spinner.show();
      this.showSpinner = true;

      this.httpCommonService.loginUser(this.email, this.password).subscribe((response: any) => {
        // this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000});
        // this.toast.success("SUCCESS", "Your Success Message", 5000);
        if (response.token) {
          // this.toast.success({ detail: "Login successful", summary: "Success", duration: 5000 });
          this.toast.success("Login successful", "Success", 5000);

          localStorage.setItem('user', this.email);
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          let data = JSON.stringify({ 'Authorization': response.token, 'email': response.username , role: response.role, width: response.width, height: response.height, loginEmail: this.email });
          this.httpCommonService.setCookie('authorizationToken', data, 365, true);
          this.spinner.hide();
          this.router.navigate(['/dashboard']);

        } else {
          this.spinner.hide();

          this.showAlert('Invalid credentials');
        }
        this.showSpinner = false;
      }
      ), (error: any) => {
        this.showSpinner = false;
        this.spinner.hide();

        this.showAlert('Invalid credentials');
      }
    } else {
      this.showAlert('Please enter email and password');
    }

  }


    showAlert(message: string): void {
      this.toast.info(message, "Info", 5000);
  }



  goToLogin(){
    this.showLogin = true;

  }



}
