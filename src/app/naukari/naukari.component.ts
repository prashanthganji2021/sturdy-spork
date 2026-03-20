import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { NgToastService } from 'ng-angular-popup';
import { HttpCommonService } from '../http-common.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';  // Correct import
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-naukari',
  templateUrl: './naukari.component.html',
  styleUrls: ['./naukari.component.css']
})
export class NaukariComponent {
  naukariForm: FormGroup;
  public Editor = ClassicEditor;  // Proper assignment
  constructor(private fb: FormBuilder, private toast: NgToastService, private httpCommonService: HttpCommonService, private spinner: NgxSpinnerService) {
    this.naukariForm = this.fb.group({
      headers: [''],
      data: ['']
    });
  }
  params = {
    page: 1,
    limit: 2000
  };
  buttonNameJson = "Combine JSON";
  json1: File;
  json2: File;
  test: File;
  one: File;
  two: File;
  dataTableParams: any = {};
  p: number = 1; // Current page number
  itemsPerPage: number = 100; // Number of items per page
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  displayedColumns: string[] = ['title', 'companyName', 'footerPlaceholderLabel', 'placeholders', 'tagsAndSkills', 'jobDescription'];
  searchTerms: string[] = Array(this.displayedColumns.length).fill(''); // Initialize search terms for each column
  suggestions: string[][] = []; // Suggestions for each column

  ngOnInit(): void {
    this.naukariForm = this.fb.group({
      headers: [''],
      data: ['']
    });
    this.allJobs();
    this.one = this.json1;
    this.two = this.json2;

    this.dataTableParams = {
      info: true,
      lengthChange: true,
      searching: true,
      autoWidth: false,
      responsive: true,
      lengthMenu: [10, 25, 50, 100],
      buttons: [{ extend: 'csv', text: 'Export as CSV', className: 'ctsmcsv mgt btn btn-info mt-0' }]
    };
    // Call `dtTrigger` to initialize datatables once data is available.
    this.dtTrigger.next(null);

  }
  AnalyzeData(): void {
    console.log('Analyzing data');

    const data = this.naukariForm.get('data')?.value;
    const headers = this.naukariForm.get('headers')?.value;
    let parsedData:  any;
    let parsedHeaders: any;
      parsedData = JSON.parse(data||'[]');
      parsedHeaders = JSON.parse(headers || '{}');
    console.log('Parsed Data:', parsedData);
    console.log('Parsed Headers:', parsedHeaders);

  }

  displayTxt(data: any): any {
  //   [
  //     {
  //         "type": "experience",
  //         "label": "3-8 Yrs"
  //     },
  //     {
  //         "type": "salary",
  //         "label": "Not disclosed"
  //     },
  //     {
  //         "type": "location",
  //         "label": "Hyderabad"
  //     }
  // ]
  //  output: experience: 3-8 Yrs, salary: Not disclosed, location: Hyderabad
    if (typeof data === 'object') {
      // return JSON.stringify(data, null, 2);
      let txt = '';
      data.forEach((item: any) => {
        txt += `${item.type}: ${item.label}, `;
      });
      return txt.slice(0, -2);

    } else {
      return data;
    }
    // return JSON.stringify(data);
  }
  getSuggestions(columnIndex: number, event: any) {
    console.log('Column Index:', columnIndex, 'Event:', event.target.value);


    this.suggestions = [];
    const term = this.searchTerms[columnIndex].toLowerCase();
    if (event.target.value.length === 0) {
      this.suggestions[columnIndex] = [];
      return;
    }
    const allValues = this.jobListings.map(job => job[this.displayedColumns[columnIndex]]);
    const uniqueValues = [...new Set(allValues)];


    this.suggestions[columnIndex] = uniqueValues.filter(value =>
      value.toString().toLowerCase().includes(term)
    ).slice(0, 5);
  }

  get filteredJobListings() {
    return this.jobListings.filter(job =>
      this.displayedColumns.every((column, index) =>

        job[column]?.toString().toLowerCase().includes(this.searchTerms[index].toString().toLowerCase().toLowerCase()) || this.searchTerms[index].length === 0
      )
    );
  }
  isConfigVisible = false;

  // Toggles the visibility of the JSON Input section
  toggleConfig() {
    this.isConfigVisible = !this.isConfigVisible;
  }

  // Update Data Action
  updateData() {
    // Logic to update data
    console.log("Update Data clicked");
  }

  // Export Data Action
  exportData() {
    // Logic to export data
    console.log("Export Data clicked");
  }

  // Check My Data Action
  checkData() {
    // Logic to check data
    console.log("Check My Data clicked");
  }
  selectSuggestion(suggestion: string, index: number) {
    if(suggestion.length > 0){
      this.searchTerms[index] = suggestion;
      this.suggestions[index] = []; // Clear suggestions after selection
      // set page to 1
      this.p = 1;
    } else {
      this.suggestions[index] = [];
    }

  }
  // Search URL Action
  searchURL() {
    // Logic to search URL
    console.log("Search URL clicked");
  }


  // let paramsList = req.body.paramsList;
  // let keyword = paramsList.keyword || 'node.js, node js developer';
  // let experience = paramsList.experience || '2';
  // let jobAge = paramsList.jobAge || '3';
  // let sort = paramsList.sort || 'p';
  // let urlType = paramsList.urlType || 'search_by_keyword';
  // let searchType = paramsList.searchType || 'adv';
  // let noOfResults = paramsList.noOfResults || '100';
  // let k = paramsList.k || 'node-dot-js-node-js-developer-jobs';
  // let src = paramsList.src || 'cluster';
  // let latLong = paramsList.latLong || '';
  // let sid = paramsList.sid || '1729865638293387';
  // let nignbevent_src = paramsList.nignbevent_src || 'jobsearchDeskGNB';
  // let seoKey = paramsList.seoKey || 'node-dot-js-node-js-developer-jobs';
  // let appid = paramsList.appid || '109';
  // let authorization = paramsList.authorization
  // let accept = paramsList.accept || 'application/json';
  // let acceptLanguage = paramsList.acceptLanguage || 'en-GB,en-US;q=0.9,en;q=0.8';
  // let cookie = paramsList.cookie
  // let nkparam = paramsList.nkparam
  // let refer = paramsList.refer || 'https://www.naukri.com/node-dot-js-node-js-developer-jobs?k=node.js%2C%20node%20js%20developer&nignbevent_src=jobsearchDeskGNB&experience=2&jobAge=3';


  onSubmit(): void {
    // const fetchRequestString = this.naukariForm.get('fetchString')?.value;

    // if (fetchRequestString) {
    //   // Pass the fetch request string to a method that will execute it
    //   this.executeFetchRequest(fetchRequestString);
    // }

    if(!this.validJsonInput){
      this.errorMessage = 'Please enter valid JSON data';
      return;
    }
    this.spinner.show();
    this.httpCommonService.updateJobs( {data : this.validJsonInput } ).subscribe((response: any) => {
    this.spinner.hide();
      this.allJobs();
      }, (error) => {
        this.spinner.hide();
        console.log('Error:', error);
      }
    )
  }
  jsonInput: string = '';
  errorMessage: string = '';
  validJsonInput:any  = {};
  jsonKeys: string[] = [];

  saveJson() {
    try {
      const jsonData = JSON.parse(this.jsonInput);
      console.log('Saved JSON:', jsonData);
      this.validJsonInput = jsonData;
      this.jsonKeys = Object.keys(jsonData);

      // Here you can send jsonData to a server or perform any action needed
      this.errorMessage = ''; // Clear any previous error messages
    } catch (error) {
      console.error('Error parsing JSON:', error);
      this.errorMessage = 'Invalid JSON format. Please correct it.';
    }
  }
  async executeFetchRequest(requestString: string): Promise<void> {
    try {

      this.httpCommonService.updateJobs( {} ).subscribe((response: any) => {

      console.log('Response:', response);
      })

    } catch (error) {
      console.error('Error executing the request:', error);
    }
  }
  jobListings: any[] = [];

  allJobs(): void {
    this.spinner.show();
    this.httpCommonService.getJobsFromDatabase(this.params).subscribe((response: any) => {
      this.jobListings = response.data;
    //   {
    //     "_id": "6763a63583948559ba8783e9",
    //     "jobId": "110923006220",
    //     "staticUrl": "https://www.naukri.com/job-listings-immediate-joiner-only-full-stack-php-developer-wfo-jogeshwari-hurix-mumbai-all-areas-3-to-8-years-110923006220",
    //     "tagsAndSkills": "laravel,Php Laravel,MongoDB,Node.Js,AWS,Full Stack,Elastic Search,PHP",
    //     "jdURL": "/job-listings-immediate-joiner-only-full-stack-php-developer-wfo-jogeshwari-hurix-mumbai-all-areas-3-to-8-years-110923006220",
    //     "isCompanyJob": false,
    //     "alreadyApplied": false,
    //     "logStr": "----F-0-1---"
    // }
      // Create the headers dynamically based on the keys of the first job listing
      if (this.jobListings.length > 0) {
        this.displayedColumns = ['alreadyApplied', 'isCompanyJob', 'staticUrl', 'companyJobURL','tagsAndSkills' ];
      }
      this.spinner.hide();
    }, (error) => {

      console.log('Error:', error);
      this.spinner.hide();
    })
  }

  isJson(str:any): boolean {
   let type = typeof str;
    return type === 'object';
  }




  public combineJSON() {
    this.test = this.one;
    console.log(this.test);
  }
  ApplyJob(job: any): void {
    console.log('Applying for job:', job);
    let url = `https://www.naukri.com${job.jdURL}`;
    if(!job.isCompanyJob){
    window.open(job.staticUrl, '_blank');
    } else {
      window.open(job.companyJobURL, '_blank');
    }
    job.alreadyApplied = true;
    this.httpCommonService.updateJobstatus( {id: job._id, alreadyApplied:true }).subscribe((response: any) => {
      console.log('Response:', response);

    })
    // https://www.naukri.com/myapply/saveApply?strJobsarr=[181024016069]&applytype=single&resId=282006926&ApplyMode=1&id=293067774&src=h&logstr=--jobsearchDesk-1-F-0-1--17298703031071937--jobsearchDesk&applySrc=jobsearchDesk&multiApplyResp=%7B%22181024016069%22%3A200%7D&jobTitle=Node%20Js%20Developer
    this.toast.success('Job applied successfully', 'Success', 5000);
  }

  clearData(): void {
    this.spinner.show();
    this.httpCommonService.clearJobs().subscribe((response: any) => {
      // this.allJobs();
      this.showAlert(response.message);
      this.allJobs();

      this.spinner.hide();
    }, (error) => {
      this.showAlert('Error clearing data');
      this.spinner.hide();
    })
  }

  showAlert(message: string): void {
    this.toast.info(message, "Info", 5000);
}


}

// curl 'https://prod.prospeo.io/mobile-finder' \
//   -H 'accept: application/json, text/plain, */*' \
//   -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
//   -H 'content-type: application/json' \
//   -H 'cookie: sessionid=1cmymfgulwwv1y6zyve92xgj3doovuv9' \
//   -H 'origin: https://www.linkedin.com' \
//   -H 'priority: u=1, i' \
//   -H 'referer: https://www.linkedin.com/' \
//   -H 'sec-ch-ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "Linux"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: cross-site' \
//   -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' \
//   -H 'x-prospeo-origin: aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3ByaXlhLWdvd2RhLWE5YjMxNzE3My8=' \
//   -H 'x-prospeo-session: 1cmymfgulwwv1y6zyve92xgj3doovuv9' \
//   --data-raw '{"url":"https://www.linkedin.com/in/priya-gowda-a9b317173/"}'
