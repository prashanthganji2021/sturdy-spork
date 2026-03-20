import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Config, ConfigColumns } from 'datatables.net';
import { NgToastService } from 'ng-angular-popup';
import { HttpCommonService } from 'src/app/http-common.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';  // Correct import



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public Editor = ClassicEditor;  // Proper assignment
  // config.htmlEmbed.showPreviews
  public model = {
    editorData: '<p>Enter your content here...</p>'  // Initial content for the editor
  };
  rawHTML = false;
  emailSubjectContent = '';
  ccEmailContent = '';
  users = [
    {
      name: 'Tiger Nixon',
      position: 'System Architect',
      office: 'Edinburgh',
      extn: '5421',
      start_date: '2011/04/25',
      salary: '$320,800'
    },
    {
      name: 'Garrett Winters',
      position: 'Accountant',
      office: 'Tokyo',
      extn: '8422',
      start_date: '2011/07/25',
      salary: '$170,750'
    },
    {
      name: 'Ashton Cox',
      position: 'Junior Technical Author',
      office: 'San Francisco',
      extn: '1562',
      start_date: '2009/01/12',
      salary: '$86,000'
    },
    {
      name: 'Cedric Kelly',
      position: 'Senior Javascript Developer',
      office: 'Edinburgh',
      extn: '6224',
      start_date: '2012/03/29',
      salary: '$433,060'
    },
    {
      name: 'Airi Satou',
      position: 'Accountant',
      office: 'Tokyo',
      extn: '5407',
      start_date: '2008/11/28',
      salary: '$162,700'
    },
    {
      name: 'Brielle Williamson',
      position: 'Integration Specialist',
      office: 'New York',
      extn: '4804',
      start_date: '2012/12/02',
      salary: '$372,000'
    },
    {
      name: 'Herrod Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      extn: '9608',
      start_date: '2012/08/06',
      salary: '$137,500'
    },
    {
      name: 'Rhona Davidson',
      position: 'Integration Specialist',
      office: 'Tokyo',
      extn: '6200',
      start_date: '2010/10/14',
      salary: '$327,900'
    },
    {
      name: 'Colleen Hurst',
      position: 'Javascript Developer',
      office: 'San Francisco',
      extn: '2360',
      start_date: '2009/09/15',
      salary: '$205,500'
    }];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;

  dtOptions: ADTSettings = {};



  constructor(
    private router: Router, private toast: NgToastService, private httpcommon: HttpCommonService
  ) {


  }

  ngOnInit(): void {
    this.checkUserLogin();

    this.getAllemaillist();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      processing: true,
      dom: '<"top"i>rt<"bottom"flp><"clear">',

    };
  }

  changeTab(tab: string) {
  }

  checkUserLogin() {
    // localStorage.setItem('user', this.email);
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  email = '';
  FilePath = '';


  sendEmail() {
    let emailtosend = this.email;
    this.userData = localStorage.getItem('userInfo'); // Change 'user' to your local storage key
    // this.email = userData || '';
    if (this.userData) {
      const user = JSON.parse(this.userData);

      // Append user data to the component properties
      this.emailSubject = user.subject || '';  // Update this key according to your user object structure
      this.ccEmail = user.ccEmail || '';        // Update this key according to your user object structure
      this.bccEmail = user.bccEmail || '';      // Update this key according to your user object structure
      this.apiKey = user.apiKey || '';          // Update this key according to your user object structure
      this.emailContent = user.emailContent
      this.emailsender = user.email || '';            // Update this key according to your user object structure
      this.senderEmail = user.senderEmail || '';  // Update this key according to your user object structure
      this.senderName = user.senderName || '';
      this.FilePath = user.FilePath || '';
    }





    if (emailtosend) {
      this.httpcommon.saveEmailId({ emailId: emailtosend, senderEmail: this.emailsender }).subscribe((res: any) => {
        let fileReader: FileReader = new FileReader();
        const filePath = this.FilePath;
        if (filePath) {
          fetch(filePath)
            .then(response => response.blob())
            .then(blob => fileReader.readAsDataURL(blob))
            .then(() => {
              fileReader.onload = () => {
                const pdfBase64 = fileReader.result as string;
                let fileName = '';
                if(this.senderEmail == 'sana.samreen2903@gmail.com'){
                  fileName = 'Resume_sana.docx';
                } else if(this.senderEmail == 'test@gmail.com'){
                  fileName = 'AnilG.pdf';
                }
                this.emailPDF(pdfBase64, fileName, emailtosend);
              };
            });

        } else {
          this.emailPDF('', '', emailtosend);
        }

        this.toast.success("Email Id Saved", 'Success', 5000);
        this.email = '';

      },
        (error: any) => this.toast.danger("Email Already sent ", 'Error', 5000)
      )




    }
  }
  userData: any;
  emailSubject: string = '';
  bccEmail: string = '';
  ccEmail: string = '';
  apiKey: string = '';
  emailContent: string = '';
  senderEmail: string = '';
  senderName: string = '';
  emailsender: string = '';

  emailPDF(pdfBase64: string, fileName: string, email = "all") {
    email = email.trim();


    const apiKey = this.apiKey;
    let sendto = []
    // if(this.emailId !== 'all'){
    //   sendto.push({
    //       email: this.emailId,
    //       name: this.emailId
    //   })
    //   }



    if (this.email !== 'all') {
      sendto.push({
        email: email,
        name: email
      })
    }
    if (this.ccEmail !== '') {
      sendto.push({
        email: this.ccEmail,
        name: this.ccEmail
      })
    }
    if (this.bccEmail !== '') {
      sendto.push({
        email: this.bccEmail,
        name: this.bccEmail
      })
    }
    let body = JSON.stringify({
      sender: {
        email: this.senderEmail,
        name: this.senderName
      },
      to: sendto,
      subject: this.emailSubject,
      htmlContent: this.emailContent,

    });
    if(this.senderEmail == 'sana.samreen2903@gmail.com'){
      fileName = 'Resume_sana.docx';
    } else if(this.senderEmail == 'test@gmail.com'){
      fileName = 'AnilG.pdf';
    }
    if (pdfBase64) {
      body = JSON.stringify({

        sender: {
          email: this.senderEmail,
          name: this.senderName
        },
        to: sendto,
        subject: this.emailSubject,
        htmlContent: this.emailContent,

        attachment: [
          {
            content: pdfBase64.split(',')[1], // Remove the data URI scheme to get the raw base64 content
            name: fileName
          }
        ]
      });
    }


    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.toast.success(`Email sent successfully to ${email}`, 'Success', 1000);
        console.log('Email sent successfully:', data)
      })
      .catch(error => console.error('Error sending email:', error));
  }

  sendCustomEmail() {
    this.userData = localStorage.getItem('userInfo'); // Change 'user' to your local storage key
    // this.email = userData || '';
    if (this.userData) {
      const user = JSON.parse(this.userData);

      // Append user data to the component properties
      this.emailSubject = user.subject || '';  // Update this key according to your user object structure
      this.ccEmail = user.ccEmail || '';        // Update this key according to your user object structure
      this.bccEmail = user.bccEmail || '';      // Update this key according to your user object structure
      this.apiKey = user.apiKey || '';          // Update this key according to your user object structure
      this.emailContent = user.emailContent
      this.emailsender = user.email || '';            // Update this key according to your user object structure
      this.senderEmail = user.senderEmail || '';  // Update this key according to your user object structure
      this.senderName = user.senderName || '';
      this.FilePath = user.FilePath || '';
    }
    let email = this.email
    email = email.trim();


    const apiKey = this.apiKey;
    let sendto = []

    if (this.email !== 'all') {
      sendto.push({
        email: email,
        name: email
      })
    }
    if (this.ccEmailContent !== '') {
      sendto.push({
        email: this.ccEmailContent,
        name: this.ccEmailContent
      })
    }

    let body = JSON.stringify({
      sender: {
        email: this.senderEmail,
        name: this.senderName
      },
      to: sendto,
      subject: this.emailSubjectContent,
      htmlContent: this.model.editorData,

    });


    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.toast.success(`Email sent successfully to ${email}`, 'Success', 1000);
        this.email = '';
        this.emailSubjectContent = '';
        this.ccEmailContent = '';
        console.log('Email sent successfully:', data)
      })
      .catch(error => console.error('Error sending email:', error));
  }
  emailList: any = [];

  sendToAllEmail() {
    // this.emailList.forEach((element: any) => {
    //   this.emailPDF('', '', element.email);

    // });
    // for every email in the list, send an email in 2 seconds interval
          // this.emailPDF('', '', element.email);
          this.userData = localStorage.getItem('userInfo'); // Change 'user' to your local storage key
          // this.email = userData || '';
          if (this.userData) {
            const user = JSON.parse(this.userData);

            // Append user data to the component properties
            this.emailSubject = user.subject || '';  // Update this key according to your user object structure
            this.ccEmail = user.ccEmail || '';        // Update this key according to your user object structure
            this.bccEmail = user.bccEmail || '';      // Update this key according to your user object structure
            this.apiKey = user.apiKey || '';          // Update this key according to your user object structure
            this.emailContent = user.emailContent
            this.emailsender = user.email || '';            // Update this key according to your user object structure
            this.senderEmail = user.senderEmail || '';  // Update this key according to your user object structure
            this.senderName = user.senderName || '';
            this.FilePath = user.FilePath || '';
          }
          const excludedEmails = [
            "tuvantuyendung@hconnect.com.vn",
            "newrecruitmentservice@gmail.com",
            "sahilahluwalia@duck.com",
            "hr.votam@gmail.com",
            "cindycalista.std@gmail.com",
            "manisha.n@marmeto.com",
            'chandana@precisiontechcorp.com',
            "suchita@ailoitte.com",
            "shivendra@solvexis.co.in",
            "mpandita@offbeatsoftwaresolutions.in",
            "anitha@divami.com"
          ];

          let emailList = this.emailList
            .filter((element: any) =>
              !element.email.includes('@gmail.com') && !excludedEmails.includes(element.email)
            )
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 150);



    emailList.forEach((element: any, index: number) => {

      setTimeout(() => {
          let email = element.email;


        let fileReader: FileReader = new FileReader();
        const filePath = this.FilePath;
        if (filePath) {
          fetch(filePath)
            .then(response => response.blob())
            .then(blob => fileReader.readAsDataURL(blob))
            .then(() => {
              fileReader.onload = () => {
                const pdfBase64 = fileReader.result as string;

                const fileName = 'AnilG.pdf';
                this.emailPDF(pdfBase64, fileName, email);
              };
            });

        } else {
          this.emailPDF('', '', email);
        }



        // if (this.email) {
        //   this.httpcommon.saveEmailId({ emailId: this.email, senderEmail: this.emailsender }).subscribe((res: any) => {

        //     this.toast.success("Email Id Saved", 'Success', 5000);
        //     this.email = '';

        //   })



        // }
      }, index * 2000);
    });
  }

  getAllemaillist() {
    this.userData = localStorage.getItem('userInfo'); // Change 'user' to your local storage key
    // this.email = userData || '';
    if (this.userData) {
      const user = JSON.parse(this.userData);

      // Append user data to the component properties
      this.emailSubject = user.subject || '';  // Update this key according to your user object structure
      this.ccEmail = user.ccEmail || '';        // Update this key according to your user object structure
      this.bccEmail = user.bccEmail || '';      // Update this key according to your user object structure
      this.apiKey = user.apiKey || '';          // Update this key according to your user object structure
      this.emailContent = user.emailContent
      this.emailsender = user.email || '';            // Update this key according to your user object structure
      this.senderEmail = user.senderEmail || '';  // Update this key according to your user object structure
      this.senderName = user.senderName || '';
    }

    if (!this.emailsender) {
      this.goToLogin();
      return;
    }


    this.httpcommon.getAllEmails({ senderEmail: this.emailsender }).subscribe((res: any) => {
      this.emailList = res.data;
    })


  }
  customEmail = false;
  CustomEmail() {
    this.customEmail = !this.customEmail;
  }
}
