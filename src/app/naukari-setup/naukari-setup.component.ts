import { Component } from '@angular/core';
import { HttpCommonService } from '../http-common.service';

@Component({
  selector: 'app-naukari-setup',
  templateUrl: './naukari-setup.component.html',
  styleUrl: './naukari-setup.component.css'
})
export class NaukariSetupComponent {
  cookieStorage: any;
  formattedCookieStorage: any;
  showMenu = false;
  FORM_SAMPLE = [
    {key: "USER_INFO", value: "" , id: 0, description: "like user email, name, etc all info related to user"},
    {key: "USER_NAME", value: "" , id: 1},
    {key: "URL_PART1", value: "https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=plsql%20developer%2C%20procedures%2C%20unix%20sql%2C%20stored%20procedures&sort=p&pageNo=" , id: 2, description: "Apply all the filters of job search , like experience, location, etc , Inspect (Control + Shift + I) and go to network tab and search for the URL (search?noOfResults=20) and copy the URL till page="},
    {key: "URL_PART2", value: "&experience=5&jobAge=3&k=plsql%20developer%2C%20procedures%2C%20unix%20sql%2C%20stored%20procedures&nignbevent_src=jobsearchDeskGNB&experience=5&jobAge=3&seoKey=plsql-developer-procedures-unix-sql-stored-procedures-jobs&src=cluster&latLong=&sid=" , id: 3 , description: "after page= , it will be end of the URL"},
    {key: "API_KEY", value: "" , id: 4, description: "API key for google aistudio visit https://aistudio.google.com/u/2/apikey"},

  ]
  FORM_KEYS: any = [];

  
  
  // https://www.naukri.com/pl-sql-plsql-programmer-plsql-development-sql-development-sql-server-development-jobs?k=pl/sql,%20plsql%20programmer,%20plsql%20development,%20sql%20development,%20sql%20server%20development&nignbevent_src=jobsearchDeskGNB&experience=6&wfhType=0&jobAge=1&cityTypeGid=17
  constructor(private httpCommonService: HttpCommonService) {
  }
  ngOnInit(): void {
    this.getCookieStorage();
    this.getKeySetUp();
    this.FORM_KEYS = [...this.FORM_SAMPLE];
  }
  onSubmit() {
    // Implement form submission logic here
    console.log('Form submitted');
  }
  onReset() {
    // Implement form reset logic here
    console.log('Form reset');
  }
  onSave() {
    // Implement save logic here
    console.log('Data saved');
  }
  onCancel() {
    // Implement cancel logic here
    console.log('Action cancelled');
  }  
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }


saveCookieStorage() {
  let CookieStorage = this.cookieStorage;
  let formattedCookieStorage
  let info = this.httpCommonService.getUserInfoFromToken()
  let user = info.loginEmail
  // data.user = user
    try{
      formattedCookieStorage = JSON.parse(CookieStorage);
    } catch (error) {
      alert('Error parsing cookie storage');
      return;
    }
//  previous in FE  not to be 
  if(Array.isArray(formattedCookieStorage)) {
    this.formattedCookieStorage = formattedCookieStorage.map((item: any) => {
      return {
        user_email: user,
        name: item.name,
        value: item.value
      };
    });
  }
}

saveCookieStorageToLocal(){
  if(this.formattedCookieStorage) {
  // Save the formatted cookie storage to local storage
  let data = {
    cookieStorage: this.formattedCookieStorage
  };

  this.httpCommonService.saveCookieStorage(data).subscribe((res: any) => {
    if(res?.status) {
      console.log('Cookie storage saved successfully');
      alert('Cookie storage saved successfully');
    }
  }, (error: any) => {
    console.error('Error saving cookie storage', error);
    alert('Error saving cookie storage');
  });
  } else {
    console.error('No formatted cookie storage found');
    alert('No formatted cookie storage found');
  }
}
clearCookieStorage(){
  this.cookieStorage = '';
}

getCookieStorage() {
  this.httpCommonService.getCookieStorage({user_email: this.httpCommonService.getUserInfoFromToken().loginEmail}).subscribe((res: any) => {
    // if(res?.data) {
    //   this.cookieStorage = res.data;
    //   this.saveCookieStorage();
    // } else {
    //   console.error('No cookie storage found');
    //   alert('No cookie storage found');
    // }
  //   [
  //     {
  //         "_id": "67f260dd43eeda92d4c4ed51",
  //         "user_email": "test@gmail.com",
  //         "name": "NKWAP",
  //         "value": "e837dc8ef38ea7e8ffb5f0fea3c3e139a08b4d3781c6704ade46d9e33d68c16c3d40a28c7ab7327d~e837dc8ef38ea7e8ffb5f0fea3c3e139a08b4d3781c6704ade46d9e33d68c16c3d40a28c7ab7327d~1~0"
  //     },

  // ]

  if(res?.data) {
    this.formattedCookieStorage = res.data;
  }
    console.log('Cookie storage fetched successfully', res);
  }
  , (error: any) => {
    console.error('Error fetching cookie storage', error);
    alert('Error fetching cookie storage');
  }
  );
}

cookieTab(Type:boolean) {
  this.showMenu = Type;
  
}

saveKeySetUp() {
  let data = {
    // user_email: this.httpCommonService.getUserInfoFromToken().loginEmail,
    form_keys: this.FORM_KEYS
  }
  let email = this.httpCommonService.getUserInfoFromToken().loginEmail
  this.FORM_KEYS.forEach((item: any) => {
    item.user_email = email;
  });


  this.httpCommonService.saveKeySetUp(data).subscribe((res: any) => {
    if(res?.status) {
      console.log('Key setup saved successfully');
      alert('Key setup saved successfully');
    }
  }, (error: any) => {
    console.error('Error saving key setup', error);
    alert('Error saving key setup');
  });

}

getKeySetUp() {
  this.httpCommonService.getKeySetUp({user_email: this.httpCommonService.getUserInfoFromToken().loginEmail}).subscribe((res: any) => {
    if(res?.data) {
      let FORM_KEYS = res.data  || this.FORM_SAMPLE;
     this.FORM_KEYS = [...this.FORM_SAMPLE];
      // this.FORM_KEYS = res.data || this.FORM_KEYS;
      this.FORM_KEYS.forEach((item: any) => {
        let found = FORM_KEYS.find((key: any) => key.key === item.key);
        if(found) {
          item.value = found.value;
          item.id = found.id;
          item.description = found.description;
        } else {
          item.value = '';
          item.id = 0;
          item.description = '';
        }
      });
      this.FORM_KEYS = this.FORM_SAMPLE;
      // check all
    }

  }, (error: any) => {
    console.error('Error fetching key setup', error);
    alert('Error fetching key setup');
  });
}

clearKeySetUp() {
  this.FORM_KEYS = [
    {key: "USER_INFO", value: "" , id: 0, description: "like user email, name, etc all info related to user"},
    {key: "USER_NAME", value: "" , id: 1},
    {key: "URL_PART1", value: "https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=plsql%20developer%2C%20procedures%2C%20unix%20sql%2C%20stored%20procedures&sort=p&pageNo=" , id: 2, description: "Apply all the filters of job search , like experience, location, etc , Inspect (Control + Shift + I) and go to network tab and search for the URL (search?noOfResults=20) and copy the URL till page="},
    {key: "URL_PART2", value: "&experience=5&jobAge=3&k=plsql%20developer%2C%20procedures%2C%20unix%20sql%2C%20stored%20procedures&nignbevent_src=jobsearchDeskGNB&experience=5&jobAge=3&seoKey=plsql-developer-procedures-unix-sql-stored-procedures-jobs&src=cluster&latLong=&sid=" , id: 3 , description: "after page= , it will be end of the URL"},
  ]
}
}
