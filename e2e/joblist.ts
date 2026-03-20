import { BACKEND_API_ENDPOINTS, NAUKARI_API_ENDPOINTS, NAUKARI_DOMAIN, RANDOM_URL } from "./constants";
import * as fs from 'fs';
import * as path from 'path';

export class JobManager {
  private readonly ctx: any;
  public page: any;
  public allJobs: any = [];
  public jobsList: any = {
    notMatching: [],
    walkInJobs: [],
    companyJobs: [],
    directApplyJobs: [],
    formJobs: [],
    bothFormAndDirectApplyJobs: [],
    alreadyApplied: [],
  }
  public allListedJobs:any = []
  public allJobsList: any = [];
  public CURRENT_AI = ''
  public notoApply:any = []

  constructor(context: any) {
    this.ctx = context;
  }


  public async getJobList() {
    try {
      console.log('Listing jobs');
      this.CURRENT_AI = NAUKARI_API_ENDPOINTS.FORM_AI
      await this.setUpLatestHeaderAndCookie(this.ctx);
      await this.listTotalJobsCanApply();
      console.log('Fetching job list', this.allJobs.length);
      // await this.checkinDb()
      console.log('Job list saved in DB', this.allJobs.length);

      console.log('Total jobs listed', this.allJobs.length);
      await this.detailListForEveryJob();
      console.log('Total jobs detailed', this.allJobs.length);
      await this.filterMatchingJobs();
      console.log('Total jobs filtered', this.allJobs.length);
      await this.spiltJobs();
      await this.applyForJob();


    } catch (error) {
      console.error(`Job listing failed:`, error);
      return false;
    }
  }



  async setUpLatestHeaderAndCookie(payload: any) {
    this.page = payload.page;

    //step 1: get the cookies from backend db and set in  payload.cookiePath path
    //Step 2: get jobshould_not_check file from backend db and set in  jobshould_not_check.conf

    // STEP 1 - Get cookies from backend database
    let cookieResponse: any;
    try {
      console.log('Fetching cookies from backend database...');
      console.log('user', this.ctx.USER_NAME, 'email', this.ctx.USER_EMAIL);
      console.log('curl command', `curl -X POST ${BACKEND_API_ENDPOINTS.GET_COOKIES} -H "Content-Type: application/json" -d '{"user": "${this.ctx.USER_NAME}", "email": "${this.ctx.USER_EMAIL}"}'`);
       cookieResponse = await fetch(BACKEND_API_ENDPOINTS.GET_COOKIES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        // send user name and email
        body: JSON.stringify({ user: this.ctx.USER_NAME, email: this.ctx.USER_EMAIL })
      });


      if (cookieResponse.ok) {
        const cookieData = await cookieResponse.json();
        
    if(cookieData?.record?.cookies){
      console.log('cookieData', cookieData);
    // Write cookies to the specified path cookiePathis json file
        fs.writeFileSync(payload.cookiePath,JSON.stringify(cookieData.record.cookies, null, 2));
        console.log(`Cookies saved to ${payload.cookiePath} as json file`);
        }
      } else {
        console.log('Failed to fetch cookies from backend, using existing cookies');
      }
    } catch (error) {
      console.log('cookieResponse', JSON.stringify(cookieResponse));
      console.error('Error fetching cookies from backend:', error);
      console.log('Using existing cookies from local storage');
    }


    await this.page.context().storageState({ path: payload.cookiePath });
    
    // Capture network requests to extract nkparam from headers
    const capturedRequests: any[] = [];
    const requestListener = (request: any) => {
      const url = request.url();
      const headers = request.headers();
      // Only capture jobapi requests that might have nkparam
      if (url.includes('jobapi') || url.includes('naukri.com')) {
        capturedRequests.push({
          url: url,
          headers: headers,
          method: request.method()
        });
      }
    };
    this.page.on('request', requestListener);
    
    await this.page.goto(RANDOM_URL);
    await this.page.waitForTimeout(5000);
    
    // Find request with nkparam in headers
    const requestWithNkparam = capturedRequests.find((req: any) => {
      return req.headers && req.headers['nkparam'];
    });
    
    if (requestWithNkparam && requestWithNkparam.headers['nkparam']) {
      const nkparamValue = requestWithNkparam.headers['nkparam'];
      console.log('Extracted nkparam from network request:', nkparamValue);
      // Update the context with the extracted nkparam
      this.ctx.headerDetails.nkparam = nkparamValue;
    } else {
      console.log('No nkparam found in network requests, using default from constants');
    }
    
    // Remove the listener
    this.page.off('request', requestListener);
    // save the cookies t

    
    // save the cookies to the backend db
    const cookie = await this.page.context().cookies();
    await fetch(BACKEND_API_ENDPOINTS.SAVE_COOKIES,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookies: cookie,
        user: this.ctx.USER_NAME,
        email: this.ctx.USER_EMAIL
      }),
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include'
    })
    console.log('cookies saved to backend')

    // STEP 2 - Get jobshould_not_check file from backend database
    try {
      // console.log('Fetching job configuration from backend database...');
      const configResponse = await fetch(BACKEND_API_ENDPOINTS.GET_JOB_CONFIG, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: this.ctx.USER_NAME, email: this.ctx.USER_EMAIL })
      });

      if (configResponse.ok) {
        const configData = await configResponse.json();
        
        // Write job configuration to jobshould_not_check.conf

        const configPath = path.join(process.cwd(), this.ctx.JOB_LISTS);
        if (configData?.record?.jobConfig) {
          // payload.JOB_LISTS,configData.record.jobConfig is a sring  convert it to array 
          //  "230825018010,230825017433,230825017404,230825016116"
          let jobConfig = configData.record.jobConfig.split(',')
          // any record has " replace it with ''
          jobConfig = jobConfig.map((jobId: any) => jobId.replace(/"/g, ''))
          this.notoApply = jobConfig
          console.log('jobConfig', jobConfig[0])
          
          
          fs.writeFileSync(configPath,jobConfig.join(','), 'utf8');
          console.log(`Job configuration saved to ${configPath}`);
        } else {
          console.log('No job IDs found in backend configuration');
        }
      } else {
        console.log('Failed to fetch job configuration from backend');
      }
    } catch (error) {
      console.error('Error fetching job configuration from backend:', error);
    }
    

    const cookies = await payload.context.cookies();
    const naukriCookie = cookies.filter((data: { domain: string; }) => data.domain == NAUKARI_DOMAIN)
    const cookieString = naukriCookie.map((cookie: { name: any; value: any; }) => `${cookie.name}:${cookie.value}`).join('; ');
    this.ctx.headerDetails.cookie = cookieString
    this.ctx.headerDetails.authorization = `Bearer ${cookies.filter((data: { name: string; }) => data.name == 'nauk_at')[0].value}`
    this.ctx.headerDetails.accessToken = `ACCESSTOKEN = ${cookies.filter((data: { name: string; }) => data.name == 'nauk_at')[0].value}`
    await this.page.goto('https://www.naukri.com/mnjuser/profile?id=&altresid')
    await this.page.locator('em').filter({ hasText: 'editOneTheme' }).first().click();

    await this.page.waitForTimeout(5000);
    // let locations = ['Hyderabad.', 'Hyderabad, Telangana', 'Hyderabad, Telangana, India', 'Hyderabad, India', 'Hyderabad, Telangana, India.'];
    let names = this.ctx.USER_NAMES;
    await this.page.getByPlaceholder('Enter Your Name').fill(names[Math.floor(Math.random() * names.length)]);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(3000);

    
  }


  async listTotalJobsCanApply() {
    let i = 1;
    let pendingJobs = 21
    let jobsArray: any = [];
    let CurrentJobsLength = 21
    const myHeaders = new Headers();
    myHeaders.append("accept", this.ctx.headerDetails.accept);
    myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
    myHeaders.append("appid", this.ctx.headerDetails.appid);
    myHeaders.append("authorization", this.ctx.headerDetails.authorization);
    myHeaders.append("clientid", this.ctx.headerDetails.clientid);
    myHeaders.append("content-type", this.ctx.headerDetails.contentType);
    myHeaders.append("cookie", this.ctx.headerDetails.cookie);
    myHeaders.append("gid", this.ctx.headerDetails.gid);
    myHeaders.append("nkparam", this.ctx.headerDetails.nkparam);
    myHeaders.append("priority", this.ctx.headerDetails.priority);
    myHeaders.append("referer", this.ctx.headerDetails.referer);
    myHeaders.append("sec-ch-ua", this.ctx.headerDetails.secChUa);
    myHeaders.append("sec-ch-ua-mobile", this.ctx.headerDetails.secChUaMobile);
    myHeaders.append("sec-ch-ua-platform", this.ctx.headerDetails.secChUaPlatform);
    myHeaders.append("sec-fetch-dest", this.ctx.headerDetails.secFetchDest);
    myHeaders.append("sec-fetch-mode", this.ctx.headerDetails.secFetchMode);
    myHeaders.append("sec-fetch-site", this.ctx.headerDetails.secFetchSite);
    myHeaders.append("systemid", this.ctx.headerDetails.systemid);
    myHeaders.append("user-agent", this.ctx.headerDetails.userAgent);
    let fetchCount = 0

    while (CurrentJobsLength !== 0) {
      // let url = `${this.ctx.URL_PART1}${i}${this.ctx.URL_PART2}`
      let url = `${this.ctx.URL_PART1}${i}${this.ctx.URL_PART2}`
      // console.log('url', url)
      console.log('myHeaders',  this.ctx.headerDetails, myHeaders)
      
      let referrer = this.ctx.referrer
      let response = await fetch(url, { method: 'GET', headers: myHeaders, referrer: referrer, referrerPolicy: 'strict-origin-when-cross-origin', mode: 'cors', credentials: 'include' });

      // curl


      try {
        let result = await response.json();
        console.log('result', result)
        console.log('R', result.noOfJobs, "J", this.allJobs.length, "P", result.noOfJobs - this.allJobs.length);
        if(result.noOfJobs === 0){
          // console.log('No jobs found', result);
        }
        let jobDetails = result.jobDetails;
        fetchCount = fetchCount + result?.jobDetails?.length || 0
        console.log('fetchCount', fetchCount)
        if (result?.jobDetails?.length) {


          jobDetails = jobDetails.filter((job: { jobId: any; })=> !this.notoApply.includes(job.jobId))

          this.allJobs.push(...jobDetails);
          pendingJobs = result.noOfJobs - fetchCount;
          CurrentJobsLength =  result?.jobDetails?.length || 0
        } else {
          CurrentJobsLength = 0
        }
        if ((result.noOfJobs - fetchCount) < 0 || this.allJobs.length > this.ctx.JOB_LISTS_LIMIT) {
          break;
        }

        i++
      } catch (error) {
        console.log('error in fetching jobs', url)
        console.log('error in fetching jobs', JSON.stringify(error.message));
      }
    }

    console.log('allJobs', this.allJobs.length, fetchCount)

    let allJobIds = this.allJobs.map((job: { jobId: any; }) => job.jobId);
    this.allJobsList = allJobIds
    this.allListedJobs = [...this.allJobsList]
    // console.log('allListedJobs', this.allListedJobs)
    // check if jobshould_not_check.conf file exists if exist then remove from allListedJobs, allJobsList
    if(fs.existsSync(path.join(process.cwd(), this.ctx.JOB_LISTS))){
      // it is conf  file so no ""
      let jobIdsToNotCheck :any = fs.readFileSync(path.join(process.cwd(), this.ctx.JOB_LISTS), 'utf8')
      jobIdsToNotCheck = jobIdsToNotCheck.split(',')
      console.log('jobIdsToNotCheck', jobIdsToNotCheck.length)

      this.allListedJobs = this.allListedJobs.filter((jobId: any) => !jobIdsToNotCheck.includes(jobId))
      this.allJobsList = this.allJobsList.filter((jobId: any) => !jobIdsToNotCheck.includes(jobId))
    }
    // console.log('allListedJobs', this.allListedJobs)
    // console.log('allJobsList', this.allJobsList)
    this.allJobs = this.allJobs.filter((job: { jobId: any; }) => this.allListedJobs.includes(job.jobId))
  }

  async detailListForEveryJob() {

    // 121

    for (let i = 0; i < this.allJobs.length; i++) {
      console.log('F', i, this.allJobs.length);

      const job = this.allJobs[i];
      const myHeaders = new Headers();
      myHeaders.append("accept", this.ctx.headerDetails.accept);
      myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
      myHeaders.append("appid", '121');
      myHeaders.append("authorization", this.ctx.headerDetails.accessToken);
      myHeaders.append("cache-control", "max-age=0");
      myHeaders.append("clientid", this.ctx.headerDetails.clientid);
      myHeaders.append("content-type", this.ctx.headerDetails.contentType);
      myHeaders.append("cookie", this.ctx.headerDetails.cookie);
      myHeaders.append("origin", "https://www.naukri.com");
      myHeaders.append("gid", this.ctx.headerDetails.gid);
      myHeaders.append("nkparam", this.ctx.headerDetails.nkparam);
      myHeaders.append("priority", this.ctx.headerDetails.priority);
      myHeaders.append("referer", "https://www.naukri.com/job-listings-application-support-lead-java-e-solutions-it-services-pvt-ltd-hyderabad-2-to-5-years-160125924403?src=jobsearchDesk&sid=17371352391488763&xp=10&px=1");
      myHeaders.append("sec-ch-ua", this.ctx.headerDetails.secChUa);
      myHeaders.append("sec-ch-ua-mobile", this.ctx.headerDetails.secChUaMobile);
      myHeaders.append("sec-ch-ua-platform", this.ctx.headerDetails.secChUaPlatform);
      myHeaders.append("sec-fetch-dest", this.ctx.headerDetails.secFetchDest);
      myHeaders.append("sec-fetch-mode", this.ctx.headerDetails.secFetchMode);
      myHeaders.append("sec-fetch-site", this.ctx.headerDetails.secFetchSite);
      myHeaders.append("systemid", this.ctx.headerDetails.systemid);
      myHeaders.append("user-agent", this.ctx.headerDetails.userAgent);

      let url = `${NAUKARI_API_ENDPOINTS.JOB_DETAILS_PART1}${job.jobId}${NAUKARI_API_ENDPOINTS.JOB_DETAILS_PART2}`

      let response = await fetch(url, { method: 'GET', headers: myHeaders, referrer: this.ctx.referrer, referrerPolicy: 'strict-origin-when-cross-origin', mode: 'cors', credentials: 'include' })

      try {
        let result = await response.json()
        let jobData = {
          jobId: job.jobId,
          staticUrl: result?.jobDetails?.staticUrl,
          tagsAndSkills: job.tagsAndSkills,
          jdURL: job.jdURL,
          companyJobURL: result.jobDetails?.applyRedirectUrl,
          isCompanyJob: !!result.jobDetails?.applyRedirectUrl,
          alreadyApplied: !!result.jobDetails?.applyDate,
          logStr: result.jobDetails?.logStr
        }
        this.allJobs[i]['detailsFound'] = jobData;
        this.allJobs[i]['MASTER'] = result;

      } catch (error) {
        // console.log('error in Getting job details', JSON.stringify(error.message));
      }
    }
  }

  async filterMatchingJobs() {

    for (let i = 0; i < this.allJobs.length; i++) {

console.log('M', i, this.allJobs.length);
      const job = this.allJobs[i];
      const myHeaders = new Headers();
      myHeaders.append("accept", this.ctx.headerDetails.accept);
      myHeaders.append("appid", '121');
      myHeaders.append("authorization", this.ctx.headerDetails.accessToken);
      myHeaders.append("clientid", this.ctx.headerDetails.clientid);
      myHeaders.append("content-type", this.ctx.headerDetails.contentType);
      myHeaders.append("sec-ch-ua", this.ctx.headerDetails.secChUa);
      myHeaders.append("sec-ch-ua-mobile", this.ctx.headerDetails.secChUaMobile);
      myHeaders.append("sec-ch-ua-platform", this.ctx.headerDetails.secChUaPlatform);
      myHeaders.append("systemid", this.ctx.headerDetails.systemid);
      myHeaders.append("cookie", this.ctx.headerDetails.cookie);
      myHeaders.append("nkparam", this.ctx.headerDetails.nkparam);
      let url = `${NAUKARI_API_ENDPOINTS.MATCH_SCORE}${job.jobId}/matchscore`

      let response = await fetch(url, { method: 'GET', headers: myHeaders, body: null, referrer: this.ctx.referrer, referrerPolicy: 'strict-origin-when-cross-origin', mode: 'cors', credentials: 'include' })
      try {
        let result = await response.json()
        // &&
        //   (result?.location) &&
        // (result?.workExperience) 
        //   (result?.skillMismatch === '')
        this.allJobs[i]['canApply'] = (
          (result?.Keyskills == 1) );
        this.allJobs[i]['matchScore'] = result;
      } catch (error) {
        console.log('error in Getting job details', JSON.stringify(error.message));
      }
    }

  }

  async spiltJobs() {
    let cannotApplyList: any = [];
    for (let i = 0; i < this.allJobs.length; i++) {
      const job = this.allJobs[i];
      if (!job.canApply) {
        this.jobsList.notMatching.push(job);
        cannotApplyList.push(Number(job.jobId));
      } else if (job['MASTER'].walkIn) {
        this.jobsList.walkInJobs.push(job);
        cannotApplyList.push(Number(job.jobId));

      } else if (job.detailsFound.alreadyApplied) {
        this.jobsList.alreadyApplied.push(job);
        cannotApplyList.push(Number(job.jobId));

      } else if (job.detailsFound.isCompanyJob) {
        this.jobsList.companyJobs.push(job);
        cannotApplyList.push(Number(job.jobId));

      } else {
        this.jobsList.bothFormAndDirectApplyJobs.push(job);
      }

      

      


    }

  
    
    if(cannotApplyList.length){
      // this.saveInDb(cannotApplyList)
    }

    console.log('bothFormAndDirectApplyJobs', this.jobsList.bothFormAndDirectApplyJobs.length);
  }

  async answerToQuestion(question) {

    


    let inputText = `${JSON.stringify(this.ctx.USER_INFO)}   Now answer the following questions: ${JSON.stringify(question)}
    Now answer the following questions:,Answer what to enter here, if you are me, what would you enter here if they give example? The answer should be in the same format, like a number. All inputs are numbers. Create JSON with question string, answer string, and option answer as per allOptions if available, in required format. No need to add an explanation.
    if option exist give option value in answerString not the index of option.
     `
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": inputText
            }
          ]
        }
      ],
      "systemInstruction": {
        "role": "systemInstruction",
        "parts": [
          {
            "text": inputText
          }
        ]
      },
      "generation_config": {
        "max_output_tokens": 1000,
        "temperature": 1,
        "topP": 1
      }
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };




    try {

      let response = await fetch(this.CURRENT_AI, requestOptions)
      let result = await response.json()
      // console.log('result', result)
      // console.log('result', result)
      if(result?.error?.code === 429){
        this.CURRENT_AI = NAUKARI_API_ENDPOINTS.FORM_AI
      }
      // console.log('result', JSON.stringify(result))
      let jsonData = result.candidates[0].content.parts[0].text ? result.candidates[0].content.parts[0].text : "NA";``
      // console.log('jsonData', jsonData)
      let item = jsonData?.includes('```json')
        ? JSON.parse(jsonData.split('```json')[1].split('```')[0])
        : jsonData;

      let answerInfo = Array.isArray(item) ? item[0] : item;
      if (question.answerOption.length) {
        // what ever the answer is, it should be in the options value
        let correctValue = false
        Object.keys(question.answerOption).forEach(key => {
          if (question.answerOption[key] === answerInfo.answerString) {
            correctValue = true
          }
        });

        if (!correctValue) {
          Object.keys(question.answerOption).forEach(key => {
            answerInfo.answerString = question.answerOption[key]
          });
        }

        Object.keys(question.answerOption).forEach(key => {
          if (question.answerOption[key] === answerInfo.answerString) {
            answerInfo.answerString = key
          }
        });

        for await (const key of Object.keys(question.answerOption)) {
          if (question.answerOption[key] === answerInfo.answerString) {
            answerInfo.answerString = question.answerOption[key]
            correctValue = true
          }
        }
        if (!correctValue) {
          for await (const key of Object.keys(question.answerOption)) {
            answerInfo.answerString = question.answerOption[key]
          }
        }






      } else {
        answerInfo.answerString = answerInfo.answerString || 'NA'
      }
      // console.log('question', question?.questionName);
      // console.log('answerInfo', answerInfo.answerString)

      // consoele with color code 
      console.log('\x1b[32m%s\x1b[0m', `Question: ${question?.questionName}, \x1b[33m%s\x1b[0m`, `Answer: ${answerInfo.answerString}`)


      return answerInfo;
    } catch (error) {
      console.log('error in Getting job details', JSON.stringify(error.message));
    }
  }
  async fillQuestinare(job: any, questionnaire: any) {

    let questions = questionnaire.jobs[0].questionnaire
    let presentFill = questionnaire.chatbotResponse?.speechResponse
    if (!presentFill) {
      return
    }
    let fillingQuestions = questions.filter(question => presentFill.some(present => present.response === question.questionName))

    let inputResponse: any = {
      text: [],
      id: []
    }

    for await (const question of fillingQuestions) {
      await this.page.waitForTimeout(3000);
      let answer = await this.answerToQuestion(question);
      question.answer = answer;
      inputResponse.text.push(question.answerOption ? question.answerOption[answer.answerString] || answer.answerString : answer.answerString)
      inputResponse.id.push('-1')
    }

    let myHeaders = new Headers();
    myHeaders.append("accept", this.ctx.headerDetails.accept);
    myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
    myHeaders.append("appid", '121');
    myHeaders.append("authorization", this.ctx.headerDetails.accessToken);
    myHeaders.append("clientid", this.ctx.headerDetails.clientid);
    myHeaders.append("content-type", this.ctx.headerDetails.contentType);
    myHeaders.append("cookie", this.ctx.headerDetails.cookie);
    myHeaders.append("gid", this.ctx.headerDetails.gid);
    myHeaders.append("nkparam", this.ctx.headerDetails.nkparam);
    myHeaders.append("priority", this.ctx.headerDetails.priority);
    myHeaders.append("referer", this.ctx.headerDetails.referer);
    myHeaders.append("sec-ch-ua", this.ctx.headerDetails.secChUa);
    myHeaders.append("sec-ch-ua-mobile", this.ctx.headerDetails.secChUaMobile);
    myHeaders.append("sec-ch-ua-platform", this.ctx.headerDetails.secChUaPlatform);
    myHeaders.append("sec-fetch-dest", this.ctx.headerDetails.secFetchDest);
    myHeaders.append("sec-fetch-mode", this.ctx.headerDetails.secFetchMode);
    myHeaders.append("sec-fetch-site", this.ctx.headerDetails.secFetchSite);
    myHeaders.append("systemid", this.ctx.headerDetails.systemid);
    myHeaders.append("user-agent", this.ctx.headerDetails.userAgent);

    let url = `${NAUKARI_API_ENDPOINTS.CHATBOT_RESPONSE}`
    let response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        "input": inputResponse,
        "appName": `${job.jobId}_apply`,
        "domain": "Naukri",
        "conversation": `${job.jobId}_apply`,
        "channel": "web",
        "status": "Returning",
        "utmSource": "",
        "utmContent": "",
        "deviceType": "WEB"
      }),
      referrer: this.ctx.referrer,
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include'
    })


    try {
      let result = await response.json()
      if (result?.speechResponse?.length && (result?.speechResponse[0]?.response === 'Thank you for your responses.')) {
        await this.singleJobApply(job, result.applyData)
      } else if (result?.speechResponse?.length && (result?.speechResponse[0]?.response !== 'Thank you for your responses.' && result?.speechResponse[0]?.response !== 'I am sorry I didn\'t understand!')) {
        await this.singleJobApply(job)
      }



    } catch (error) {
      console.log('error in Getting job details', JSON.stringify(error.message));
    }



  }

  async applyForJob() {
    // from allJobsList, get the jobIds and remove bothFormAndDirectApplyJobs and save in  jobshould_not_check.conf
    let jobIds = this.allListedJobs
    let canApplyJobs = this.jobsList.bothFormAndDirectApplyJobs.map((job: { jobId: any; }) => job.jobId)
    console.log('canApplyJobs', canApplyJobs)
    console.log('canApplyJobs', canApplyJobs.length, jobIds.length)
    // remove canApplyJobs from jobIds
    let jobIdsToNotCheck = jobIds.filter((jobId: any) => !canApplyJobs.includes(jobId)).join(',')
    console.log('jobIdsToNotCheck', jobIdsToNotCheck.length)
    

    
    // Save to jobshould_not_check.conf file
    try {
      const configPath = path.join(process.cwd(), this.ctx.JOB_LISTS);
      
      // Check if file exists and read existing data
      let existingData = '';
      if (fs.existsSync(configPath)) {

        existingData = fs.readFileSync(configPath, 'utf8');
        // console.log(`Existing data found: ${existingData}`);
      }
      
      // Concatenate existing data with new data
      let finalData = existingData;
      if (existingData && jobIdsToNotCheck) {
        finalData = existingData + ',' + jobIdsToNotCheck;
      } else if (jobIdsToNotCheck) {
        finalData = jobIdsToNotCheck;
      }
      
      // Remove duplicates by splitting, filtering, and joining
      let uniqueJobIds = finalData.split(',').filter((id: any) => id !== '')
      uniqueJobIds = [...new Set(uniqueJobIds)]


      fs.writeFileSync(configPath, uniqueJobIds.join(','))

      await fetch(BACKEND_API_ENDPOINTS.SAVE_JOB_CONFIG, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: this.ctx.USER_NAME, email: this.ctx.USER_EMAIL, jobConfig: uniqueJobIds.join(',') })
      })
      // console.log(`Job IDs saved to ${configPath}: ${uniqueJobIds.join(',')}`);
    } catch (error) {
      console.error('Error saving job IDs to config file:', error);
    }

    for (let i = 0; i < this.jobsList.bothFormAndDirectApplyJobs.length; i++) {
      const job = this.jobsList.bothFormAndDirectApplyJobs[i];
      let jobURL = job.detailsFound?.staticUrl;
      // console.log('jobURL', jobURL, i, this.jobsList.bothFormAndDirectApplyJobs.length, this.jobsList.bothFormAndDirectApplyJobs.length - i);
      try {
        await Promise.race([
          this.singleJobApply(job),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 25000))
        ]);
      } catch (error) {
        console.log('error in applying for job', jobURL, error.message);
      }
    }
  }

  async singleJobApply(job: any, singleJobApply = null) {
    const myHeaders = new Headers();
    myHeaders.append("accept", this.ctx.headerDetails.accept);
    myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
    myHeaders.append("appid", '121');
    myHeaders.append("authorization", this.ctx.headerDetails.accessToken);
    myHeaders.append("cache-control", "max-age=0");
    myHeaders.append("clientid", this.ctx.headerDetails.clientid);
    myHeaders.append("content-type", this.ctx.headerDetails.contentType);
    myHeaders.append("cookie", this.ctx.headerDetails.cookie);
    myHeaders.append("origin", "https://www.naukri.com");
    myHeaders.append("gid", this.ctx.headerDetails.gid);
    myHeaders.append("nkparam", this.ctx.headerDetails.nkparam);
    myHeaders.append("priority", this.ctx.headerDetails.priority);
    myHeaders.append("sec-ch-ua", this.ctx.headerDetails.secChUa);
    myHeaders.append("sec-ch-ua-mobile", this.ctx.headerDetails.secChUaMobile);
    myHeaders.append("sec-ch-ua-platform", this.ctx.headerDetails.secChUaPlatform);
    myHeaders.append("sec-fetch-dest", this.ctx.headerDetails.secFetchDest);
    myHeaders.append("sec-fetch-mode", this.ctx.headerDetails.secFetchMode);
    myHeaders.append("sec-fetch-site", this.ctx.headerDetails.secFetchSite);
    myHeaders.append("systemid", this.ctx.headerDetails.systemid);
    myHeaders.append("user-agent", this.ctx.headerDetails.userAgent);

    let url = `${NAUKARI_API_ENDPOINTS.APPLY}`
    let bodyList = JSON.stringify({
      "strJobsarr": [job.jobId],
      "logstr": job.MASTER.logStr || "----F-0-1---",
      "flowtype": "show",
      "crossdomain": true,
      "jquery": 1,
      "rdxMsgId": "",
      "chatBotSDK": true,
      "mandatory_skills": job.tagsAndSkills ? job.tagsAndSkills?.split(',') || ['nodejs'] : ['nodejs'],
      "optional_skills": job.tagsAndSkills ? job.tagsAndSkills?.split(',') || ['nodejs'] : ['nodejs'],
      "applyTypeId": "107",
      "closebtn": "y",
      "applySrc": job.MASTER.logStr || "----F-0-1---",
      "sid": "",
      "mid": "",
      ...(singleJobApply ? { "applyData": singleJobApply } : {})
    })

    let response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: bodyList,
      referrer: this.ctx.referrer,
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include'
    })
    try {
      let result = await response.json()
      if (result?.quotaDetails) {
        console.log('result', result?.quotaDetails)
        if(result?.quotaDetails?.dailyApplied === 50){
          // no longer apply for jobs
          return    ;
        }
      } 
      if (result.statusCode == 0) {
        await this.fillQuestinare(job, result)
      }

    } catch {
      return false;
    }
  }
  async checkinDb() {

    let myHeaders = new Headers();
  
    let url = `${BACKEND_API_ENDPOINTS.JOB_LISTING}`
    myHeaders.append("accept", this.ctx.headerDetails.accept);
    myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
    myHeaders.append("content-type", this.ctx.headerDetails.contentType);
    let chenks = 1000
    let jobsCount =  this.allJobs.length/chenks
    let jobListedArray:any = []
    for(let i = 0; i < jobsCount; i++){
      let start = i * chenks
      let end = (i + 1) * chenks
      let jobList = this.allJobs.slice(start, end)
      let convetToString = JSON.stringify(jobList.map((job: { jobId: any; }) => Number(job.jobId)))
  

    let response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ user : this.ctx.USER_NAME, jobList: convetToString }),
      referrer: this.ctx.referrer,
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include'
    })

    try {
      let result = await response.json()
      if (result?.data) {
        let parseData = JSON.parse(result?.data)
        jobListedArray.push(...parseData)
        console.log(' Db ', jobList.length , parseData.length);
      }

    } catch (error) {
      console.log('error in Getting job details', JSON.stringify(error?.message));
    }
  }
  this.allJobs = this.allJobs.filter((job: { jobId: any; }) => jobListedArray.includes(Number(job.jobId)))

  }

  async saveInDb(jobIds: any) {
    // console.log('jobIds Cannot apply', jobIds);
    let myHeaders = new Headers();
    let url = `${BACKEND_API_ENDPOINTS.SAVE_JOB}`
    myHeaders.append("accept", this.ctx.headerDetails.accept);
    myHeaders.append("accept-language", this.ctx.headerDetails.acceptLanguage);
    myHeaders.append("content-type", this.ctx.headerDetails.contentType);

    let convetToString = JSON.stringify(jobIds)

    let response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ user : this.ctx.USER_NAME, jobList: convetToString }),
      referrer: this.ctx.referrer,
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include'
    })
    try {
      let result = await response.json()
     

    }
    catch (error) {
      console.log('error in Getting job details', JSON.stringify(error?.message));
    }
  }
    


}
