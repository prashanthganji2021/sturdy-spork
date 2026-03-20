import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';  // Correct import
import { HttpCommonService } from '../http-common.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public Editor = ClassicEditor;  // Proper assignment
  public model = {
    editorData: '<p>Enter your content here...</p>'  // Initial content for the editor
  };

  // Fields to hold user data
  public emailSubject: string = '';
  public ccEmail: string = '';
  public bccEmail: string = '';
  public apiKey: string = '';
  public senderEmail: string = '';
  public senderName: string = '';
  public FilePath: string = '';
  public naukriCookie: string = '';
  public nukriAuthorization: string = '';
  public naukriNkparam: string = '';
  email = '';
  userData:any


    constructor( private toast: NgToastService, private httpCommonService: HttpCommonService, ) { }

  ngOnInit() {
    this.loadUserData();
  }

  // Load user data from local storage
  loadUserData() {
    this.userData = localStorage.getItem('userInfo'); // Change 'user' to your local storage key
    // this.email = userData || '';
    if (this.userData) {
      const user = JSON.parse(this.userData);

      // Append user data to the component properties
      this.emailSubject = user.subject || '';  // Update this key according to your user object structure
      this.ccEmail = user.ccEmail || '';        // Update this key according to your user object structure
      this.bccEmail = user.bccEmail || '';      // Update this key according to your user object structure
      this.apiKey = user.apiKey || '';          // Update this key according to your user object structure
      this.model.editorData = user.emailContent || this.model.editorData;  // Update this key according to your user object structure
      this.email = user.email || '';            // Update this key according to your user object structure
      this.senderEmail = user.senderEmail || '';  // Update this key according to your user object structure
      this.senderName = user.senderName || '';    // Update this key according to your user object structure
      this.FilePath = user.FilePath || '';    // Update this key according to your user object structure
      this.naukriCookie = user.naukriCookie || '';    // Update this key according to your user object structure
      this.nukriAuthorization = user.nukriAuthorization || '';    // Update this key according to your user object structure
      this.naukriNkparam = user.naukriNkparam || '';    // Update this key according to your user object
    } else {
      this.redirectUserToLoginPage();  // Redirect user to login page if user data is not found
    }
  }

  // This function handles form submission
  onSubmit(formData: any) {
    // You can handle your form submission logic here
    const subject = formData.emailSubject;
    const ccEmail = formData.ccEmail;
    const bccEmail = formData.bccEmail;
    const apiKey = formData.apiKey;
    const emailContent = this.model.editorData;  // CKEditor data
    // const fileUpload = formData.fileUpload;

    let data= {
      subject,
      ccEmail,
      bccEmail,
      apiKey,
      emailContent,
      email: this.email,
      // fileUpload,
      FilePath: this.FilePath,
      senderEmail: this.senderEmail,
      senderName: this.senderName,
      naukriCookie: this.naukriCookie,
      nukriAuthorization: this.nukriAuthorization,
      naukriNkparam: this.naukriNkparam
    }
    this.userData = JSON.parse(this.userData);

    this.userData.subject = subject;
    this.userData.ccEmail = ccEmail;
    this.userData.bccEmail = bccEmail;
    this.userData.apiKey = apiKey;
    this.userData.emailContent = emailContent;
    this.userData.senderEmail = this.senderEmail;
    this.userData.senderName = this.senderName;
    this.userData.FilePath = this.FilePath;
    this.userData.naukriCookie = this.naukriCookie;
    this.userData.nukriAuthorization = this.nukriAuthorization;
    this.userData.naukriNkparam = this.naukriNkparam;
    // this.userData.fileUpload = file

    this.httpCommonService.updateUserSettings( data ).subscribe((response: any) => {

      this.toast.success('Settings updated successfully', 'Success', 5000);  // Display success message

      localStorage.setItem('userInfo', JSON.stringify(this.userData));  // Update user data in local storage
    })

    // Implement your API call or further processing here
  }

  redirectUserToLoginPage() {
    // Redirect user to login page
    // this.router.navigate(['/login']);
    console.log('Redirecting user to login page...');
  }
}
