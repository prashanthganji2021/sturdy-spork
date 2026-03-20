export const TIMEOUTS = {
  NAVIGATION: 3000,
  SHORT: 1000,
  MEDIUM: 4000,
  LONG: 9000,
  VISIBILITY: 30000,
} as const;

export const SELECTORS = {
  JOB_MATCH_SCORE: 'div:has-text("Job match score")',
  APPLIED: '#job_header:has-text("Applied")',
  APPLY_BUTTON: 'button:has-text("Apply")',
  COMPANY_APPLY: 'button:has-text("Apply on company site")',
  CHATBOT: '.chatbot_MessageContainer',
  JOB_LISTING: '.srp-jobtuple-wrapper',
  INPUT_FIELD: 'div[data-placeholder="Type message here..."]',
  SAVE_BUTTON: 'text=Save >> nth=-1',
} as const;

export const API_ENDPOINTS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
} as const;

export const LIMITS = {
  MAX_JOBS: 100,
  CHUNK_SIZE: 40,
  DAILY_APPLY_LIMIT: 60,
} as const;

export const RANDOM_URL = 'https://www.naukri.com/job-listings-backend-developer-han-digital-solution-p-pune-bengaluru-4-to-9-years-221125500869?src=directSearch&sid=17640944727239705&xp=1&px=1';

export const NAUKARI_DOMAIN = '.naukri.com';

// https://www.naukri.com/jobapi/v4/job/${job.jobId}?microsite=y

export const NAUKARI_API_ENDPOINTS = {
  JOB_DETAILS_PART1: 'https://www.naukri.com/jobapi/v4/job/',
  JOB_DETAILS_PART2: '?microsite=y',
  MATCH_SCORE: 'https://www.naukri.com/jobapi/v3/job/',
  APPLY: 'https://www.naukri.com/cloudgateway-workflow/workflow-services/apply-workflow/v1/apply',
  // AIzaSyB7d0EGHQsCoszAoHAbwcycA4y_Dewm_l8,AIzaSyD9z8xAFFNN26wVQFH_ff60-9Flv_ID1mQ
  FORM_AI: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD9z8xAFFNN26wVQFH_ff60-9Flv_ID1mQ',
  FORM_AI2: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=AIzaSyB7d0EGHQsCoszAoHAbwcycA4y_Dewm_l8',
  CHATBOT_RESPONSE: 'https://www.naukri.com/cloudgateway-chatbot/chatbot-services/botapi/v5/respond',
}


export const MATRIMONY_API_ENDPOINTS = {
  LOGIN_URL: 'https://www.padmasalimatrimony.com/login/',
  LIST_URL: 'https://matches.padmasalimatrimony.com/main/#/matches/All_Matches',
}

export const ANIL_DATA = {
    headerDetails: {
      accept: "application/json",
      acceptLanguage: "en-GB,en-US;q=0.9,en;q=0.8",
      appid: "109",
      authorization: "",
      clientid: "d3skt0p",
      contentType: "application/json",
      cookie: "",
      nkparam: "==",
      gid: "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE",
      priority: "u=1, i",
      referer: "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB",
      secChUa: "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      secChUaMobile: "?0",
      secChUaPlatform: "\"Linux\"",
      secFetchDest: "empty",
      secFetchMode: "cors",
      secFetchSite: "same-origin",
      systemid: "Naukri",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    },
    cookiePath: 'storage/admin.json',
    USER_NAME: 'ANIL',
    URL_PART1: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=node.js%2C%20node%20js%20developer%2C%20react.js%2C%20mean%20stack%2C%20mern%20stack%2C%20full%20stack&pageNo=',
    URL_PART2: `&sort=p&experience=2&jobAge=3&k=node.js%2C%20node%20js%20developer%2C%20react.js%2C%20mean%20stack%2C%20mern%20stack%2C%20full%20stack&nignbevent_src=jobsearchDeskGNB&experience=2&jobAge=3&seoKey=node-dot-js-node-js-developer-react-dot-js-mean-stack-mern-stack-full-stack-jobs-2&src=cluster&latLong=&sid=${new Date().getTime()}`,
    referrer: 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB',

    USER_INFO: `Anil Kumar Ganji, Node.js Developer with 3 years of experience. Highlight skills in JavaScript, Node.js, React.js, MySQL, and Git. Include work experience at Pennar Industries (March 2023-Present) on a Report Management Application, and educational background (B.Tech, Kakatiya University) CIVIL.  Open to relocation. nodejs experience NOTICE PERIOD: 15 D || nodejs experience : 3 ||Mobile: 9705140251  Email: ganjianilkumar1998@gmail.com || PostgreSQL 2 years ||  React.js 1 year || next.js 0 year || 25 Years ||  Node.js 3 years ||  React.js 1 year ||  next.js 0 year ||  PostgreSQL 2 years || MySQL 1 year ||  Git 3 years ||  JavaScript 3 years ||  HTML 3 years ||  CSS 3 years ||  CIVIL 4 years || express 2 years || mongodb 3 years || typescript 1 year || javascript 3 years CURRENT LOCATION : hyderabad , TELANGANA|| CTC 350000 || ECTC 400000 ||`
}


export const ANIL_DATA_1 = {
  headerDetails: {
    accept: "application/json",
    acceptLanguage: "en-GB,en-US;q=0.9,en;q=0.8",
    appid: "109",
    authorization: "",
    clientid: "d3skt0p",
    contentType: "application/json",
    cookie: "",
    nkparam: "==",
    gid: "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE",
    priority: "u=1, i",
    referer: "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB",
    secChUa: "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    secChUaMobile: "?0",
    secChUaPlatform: "\"Linux\"",
    secFetchDest: "empty",
    secFetchMode: "cors",
    secFetchSite: "same-origin",
    systemid: "Naukri",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  },
  cookiePath: 'storage/admin.json',
  USER_NAME: 'ANIL',
  URL_PART1: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=react%20js%20developer%2C%20react.js%2C%20react.js%2C%20front%20end%20developer&sort=p&pageNo=',
  URL_PART2: `&experience=1&jobAge=3&k=react%20js%20developer%2C%20react.js%2C%20react.js%2C%20front%20end%20developer&nignbevent_src=jobsearchDeskGNB&experience=1&jobAge=3&seoKey=react-js-developer-react-dot-js-react-dot-js-front-end-developer-jobs&src=cluster&latLong=&sid=${new Date().getTime()}`,
  referrer: 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB',
  USER_INFO: `Anil Kumar Ganji, Node.js Developer with 2 years of experience. Highlight skills in JavaScript, Node.js, React.js, MySQL, and Git. Include work experience at Pennar Industries (March 2023-Present) on a Report Management Application, and educational background (B.Tech, Kakatiya University) CIVIL.  Open to relocation. nodejs experience NOTICE PERIOD: 15 D || nodejs experience : 2 ||Mobile: 9705140251  Email: ganjianilkumar1998@gmail.com || PostgreSQL 2 years ||  React.js 1 year || next.js 0 year || 25 Years ||  Node.js 3 years ||  React.js 1 year ||  next.js 0 year ||  PostgreSQL 2 years || MySQL 1 year ||  Git 2 years ||  JavaScript 3 years ||  HTML 3 years ||  CSS 3 years ||  CIVIL 4 years || express 2 years || mongodb 3 years || typescript 1 year || javascript 3 years CURRENT LOCATION : hyderabad , TELANGANA|| CTC 350000 || ECTC 400000 ||`
}

export const SANA_DATA = {
  headerDetails: {
    accept: "application/json",
    acceptLanguage: "en-GB,en-US;q=0.9,en;q=0.8",
    appid: "109",
    authorization: "",
    clientid: "d3skt0p",
    contentType: "application/json",
    cookie: "",
    nkparam: "==",
    gid: "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE",
    priority: "u=1, i",
    referer: "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB",
    secChUa: "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    secChUaMobile: "?0",
    secChUaPlatform: "\"Linux\"",
    secFetchDest: "empty",
    secFetchMode: "cors",
    secFetchSite: "same-origin",
    systemid: "Naukri",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  },
  JOB_LISTS: 'jobshould_not_check_sana.conf',
  JOB_LISTS_LIMIT: 250,
  cookiePath: 'storage/sana.json',
  USER_NAME: 'SANA',
  USER_EMAIL: 'SANA',
  USER_NAMES: ['Sana Samreen Shaik', 'Sana Samreen', 'SANA SAMREEN' ],

  URL_PART1: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=plsql%2C%20sql%2C%20unix%2C%20power%20bi&pageNo=',
  URL_PART2: `&sort=r&experience=5&wfhType=0&k=plsql%2C%20sql%2C%20unix%2C%20power%20bi&nignbevent_src=jobsearchDeskGNB&experience=5&wfhType=0&seoKey=plsql-sql-unix-power-bi-jobs-2&src=sortby&latLong=&sid=${new Date().getTime()}`,
  URL_PART3: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=system%20analyst(sql)&pageNo=',
  URL_PART4: `&sort=r&jobAge=30&experience=6&wfhType=0&k=system%20analyst(sql)&nignbevent_src=jobsearchDeskGNB&jobAge=30&experience=6&wfhType=0&seoKey=system-analystsql-jobs-2&src=sortby&latLong=&sid=${new Date().getTime()}`,

  // https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=it%20analyst%20c2&sort=p&pageNo=1&experience=6&wfhType=0&jobAge=30&k=it%20analyst%20c2&nignbevent_src=jobsearchDeskGNB&experience=6&wfhType=0&jobAge=30&seoKey=it-analyst-c2-jobs&src=cluster&latLong=&sid=17560410202526005_1

  referrer: 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB',
  USER_INFO: `Sana Samreen Shaik, IT Support Executive with over 4 years of experience in SQL, PL/SQL, and UNIX commands. Proficient in tools like Toad for Oracle, Tableau, Splunk, and Autosys. Hands-on experience in production support, job monitoring, database handling, and application health checks. Work experience includes TCS projects for Bank of America (Nov 2022–Present) and Cigna (July 2019–Nov 2022). Holds an M.Tech in Mechanical Engineering from JNTU, Hyderabad. locationOt Hyderabad, INDIA || experienceOneTheme|| 5 Years 3 Months|| walletOneTheme|| ₹ 5,96,000|| phoneOneTheme|| 8897792687|| verifiedOneTheme mailOneTheme|| sana.samreen2903@gmail.com|| verifiedOneTheme|| calenderOneTheme|| 2 Months notice period|| Notice Period: Immediate || SQL Experience: 4+ years || UNIX Experience: 4+ years || Current Location: Gadwal, Telangana || CTC: ₹5,50,000 || ECTC: ₹10,00,000 || Female || 24/03/1996 || Mobile: 8897792687 || Email: sana.samreen2903@gmail.com { "user": { "username": "sanasamreen2304@gmail.com", "email": "sana.samreen2903@gmail.com", "mobile": "8897792687", "resdexVisibility": "active", "canChooseProfileDuringApply": true, "residencePhone": { "countryCode": null, "areaCode": null, "phoneNumber": null }, "communicationSettings": { "naukriProductEmail": true, "naukriProductSms": true, "resumeServiceSmsOrCall": true, "recruiterContact": true, "jobAlert": true }, "creationDate": "2021-09-09T00:00:00+0530", "userProperties": { "hasCertifications": false, "hasVoiceProfile": false, "hasInbox": true, "dnaEmv": "unknown", "hasFreeCvSearch": false, "isFeatured": false, "isVerifiedViaCrederity": false }, "lastThirtyDaysApplicationCount": "0", "alternateEmail": "sana.samreen2903@gmail.com", "isMobileVerified": true, "isEmailVerified": true, "isSecondaryEmailVerified": true, "isPremium": false }, "itskills": [ { "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "experienceTime": { "month": 0, "year": 4 }, "lastUsed": { "id": 2024, "value": 2024 }, "skill": "SQL Database", "version": "12.2", "entitySkill": "SQL Database", "entitySkillId": "7660", "src": "itSkills", "mod_dt": null, "skillId": "e893794388f62fb682b81deac77e5fd74c9851d0d6724acb11e56d4c06f64435" }, { "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "experienceTime": { "month": 0, "year": 4 }, "lastUsed": { "id": 2024, "value": 2024 }, "skill": "UNIX", "version": "", "entitySkill": "UNIX", "entitySkillId": "1098", "src": "itSkills", "mod_dt": null, "skillId": "a36ea07ad5131fbd4c626094973af2a5f440f06fe2acbe29cdf3e35370f49177" } ], "certifications": [ { "certificationId": "4dde40238a935161520f00a06981ede664a3686446cccde3", "certificationBody": "Udemy", "certificationCompletionYear": { "id": 0, "value": 0 }, "course": "Python for Absolute Beginners ", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "metadata": null, "entityCertificateId": "VLPNL7Z4Q05S23D4L", "completionId": "UC-13150361-c048-46-516d-87b84de8fe20", "url": "ude.my/UC-13160361-c048-46-b16d-87b84de8fe20", "issueDate": null, "expiryDate": "00-0000", "vendorId": 937682, "vendor": "Udemy", "bodytype": "COMPANY" } ], "educations": [ { "courseType": "F", "course": { "id": 12, "value": "M.Tech", "subValue": "" }, "specialisation": { "id": 16, "value": "Mechanical", "subValue": "" }, "institute": "Jawaharlal Nehru Technological University (JNTU)", "educationType": { "id": 2, "value": "PG", "subValue": "PG" }, "grade": { "id": 3, "value": "% Marks of 100 Maximum", "subValue": "" }, "marks": "83.23", "educationId": "d1aa36bbf336cd626c532f3f6232bbbe5dd8b4c6e073a0caf79fd6c296adc7b6", "yearOfStart": 2018, "yearOfCompletion": 2019, "entityInstitute": { "id": "1043", "value": "Jawaharlal Nehru Technological University (JNTU)" }, "isPrimary": 1, "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [] }, { "courseType": "F", "course": { "id": 12, "value": "B.Tech/B.E.", "subValue": "" }, "specialisation": { "id": 16, "value": "Mechanical", "subValue": "" }, "institute": "Jawaharlal Nehru Technological University (JNTU)", "educationType": { "id": 1, "value": "UG", "subValue": "UG" }, "grade": null, "marks": "", "educationId": "d00aa75497d357b0b69df702cf14404dce4b308e41963104fcc93b141dd0abb8", "yearOfStart": 2015, "yearOfCompletion": 2018, "entityInstitute": { "id": "1043", "value": "Jawaharlal Nehru Technological University (JNTU)" }, "isPrimary": 1, "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [] } ], "employments": [ { "designation": "IT Analyst ", "designationId": "J1FLG1ORQ9R4L1WLL", "employmentType": "current", "endDate": null, "jobDescription": "I am responsible to handle coustomer request", "organization": "Tata Consultancy Services (TCS)", "organizationId": "223346", "startDate": "2019-07-01", "employmentId": "bbef8fe333f673b3104bcbfe71bbbc6253eb1c21c0806d65cdf3e35370f49177", "keySkills": "Slq, UNIX, PLSQL", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [ { "id": "90f2a8530db3de06c0d3337aebab4c5234762e94713e8b96", "title": "BOA " } ], "experienceType": "F", "location": { "id": 0, "value": null }, "department": { "id": 0, "value": null }, "roleCategory": { "id": 0, "value": null }, "role": { "id": 0, "value": null }, "currency": "INR", "salary": "", "projectURL": "", "employerVerificationStatus": null, "employerVerificationTime": null, "employerVerificationMethod": null }, { "designation": "System Engineer", "designationId": "1052", "employmentType": "previous", "endDate": "2019-07-01", "jobDescription": "I am responsible for monitoring numerous applications for their up and running, need to check the status and smooth running of daily, weekly, monthly jobs. Apart from that as a team member I was responsible for handling requests raised for reports, by the end user or client in such cases we are supposed to do the needful for example if the request is for database reports then we use SQL queries for extracting reports from databases.", "organization": "TATA CONSULTANCY SERVICES (TCS)", "organizationId": "223346", "startDate": "2019-07-01", "employmentId": "a1bd47392ae1277128fe1e91c8cd55c17413ccd1d71f9750f79fd6c296adc7b6", "keySkills": null, "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [], "experienceType": "F", "location": { "id": 0, "value": null }, "department": { "id": 0, "value": null }, "roleCategory": { "id": 0, "value": null }, "role": { "id": 0, "value": null }, "currency": null, "salary": null, "projectURL": null, "employerVerificationStatus": null, "employerVerificationTime": null, "employerVerificationMethod": null }, { "designation": "System Engineer", "designationId": "1052", "employmentType": "other", "endDate": "2019-07-01", "jobDescription": "Hi This is Sana Shaik, My roles and responsibilities are Handling incidents and working on production change request wchich raised by business users and also extensively working in SQL database, Unix commands using putty, tool like Team Quest for server monitoring, eap work station to monitor daily, weekly, monthly  scheduled jobs. And also various applications support.", "organization": "TATA CONSULTANCY SERVICES (TCS)", "organizationId": "223346", "startDate": "2019-07-01", "employmentId": "f4e790f9190bc84319e1b4f8640cd0a18e0dc35d25fc9b64b679862093b973de", "keySkills": null, "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [ { "id": "c89e072404d14106d59e1e287940668520952fe5a2d4d1d8", "title": "Cigna health care " } ], "experienceType": "F", "location": { "id": 0, "value": null }, "department": { "id": 0, "value": null }, "roleCategory": { "id": 0, "value": null }, "role": { "id": 0, "value": null }, "currency": null, "salary": null, "projectURL": null, "employerVerificationStatus": null, "employerVerificationTime": null, "employerVerificationMethod": null }, { "designation": "System Engineer", "designationId": "1052", "employmentType": "other", "endDate": "2019-07-01", "jobDescription": "I am responsible for handling various applications, using tools like Team Quest and enterprise insight portal. And handling the database for extracting records as per client requirements using SQL commands in oracle DB2. And having basic Unix command knowledge on tool putty.", "organization": "TCS", "organizationId": "223346", "startDate": "2019-07-01", "employmentId": "cf91c8dd957c6eb4c3c672267b54b6daec9e672a08c2469cf79fd6c296adc7b6", "keySkills": "SQL, Unix", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [], "experienceType": "F", "location": { "id": 0, "value": null }, "department": { "id": 0, "value": null }, "roleCategory": { "id": 0, "value": null }, "role": { "id": 0, "value": null }, "currency": "INR", "salary": "", "projectURL": "", "employerVerificationStatus": null, "employerVerificationTime": null, "employerVerificationMethod": null }, { "designation": "System Engineer", "designationId": "1052", "employmentType": "other", "endDate": "2019-07-01", "jobDescription": "I am responsible to handle various tasks as I have worked in a production support project. I have to monitor various applications for its up and running status and monitoring tool like team quest for servers space issues. I had to handle a few customer tickets of our clients who come up with queries to extract records from our database which we are usually take care of. I have been Awarded with on the spot awards for quiet times.", "organization": "TCS", "organizationId": "223346", "startDate": "2019-07-01", "employmentId": "2d3ff2c55d81b321a3c59d94ebbaaabc25f0f83fef1efa2911e56d4c06f64435", "keySkills": "SQL Database, Unix", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projects": [], "experienceType": "F", "location": { "id": 0, "value": null }, "department": { "id": 0, "value": null }, "roleCategory": { "id": 0, "value": null }, "role": { "id": 0, "value": null }, "currency": "INR", "salary": "", "projectURL": "", "employerVerificationStatus": null, "employerVerificationTime": null, "employerVerificationMethod": null } ], "projects": [ { "clientName": "Bank Of America", "projectClientId": "122496", "designation": null, "eduExpFlag": 3, "eduExpId": "bbef8fe333f673b3104bcbfe71bbbc6253eb1c21c0806d65cdf3e35370f49177", "employmentType": "Full Time", "endDate": null, "projectDetails": "banking sector ", "projectLocation": "", "projectTitle": "BOA ", "teamSize": { "id": 0, "value": 0 }, "role": "", "skills": "", "startDate": "2022-11-01", "projectId": "90f2a8530db3de06c0d3337aebab4c5234762e94713e8b96", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projectUrl": null, "metadata": null, "isOnSiteProject": false }, { "clientName": "Cigna", "projectClientId": "4663241", "designation": null, "eduExpFlag": 3, "eduExpId": "f4e790f9190bc84319e1b4f8640cd0a18e0dc35d25fc9b64b679862093b973de", "employmentType": "Full Time", "endDate": "2022-02-01", "projectDetails": "It is a US based health insurance company ", "projectLocation": "", "projectTitle": "Cigna health care ", "teamSize": { "id": 0, "value": 0 }, "role": "", "skills": "", "startDate": "2019-08-01", "projectId": "c89e072404d14106d59e1e287940668520952fe5a2d4d1d8", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "projectUrl": null, "metadata": null, "isOnSiteProject": false } ], "schools": [], "languages": [ { "proficiency": { "id": 3, "value": "Expert" }, "ability": [ "read", "write", "speak" ], "lang": "Hindi", "languageId": "c676eae05551b25b52827d22ed181b3894c673c2356d14da11e56d4c06f64435", "entityLanguageId": "2", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de" }, { "proficiency": { "id": 2, "value": "Proficient" }, "ability": [ "read", "write", "speak" ], "lang": "English", "languageId": "e6056bdf04f5628130901fe5327c1af8fa8f33a28fa0cb53b679862093b973de", "entityLanguageId": "1", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de" }, { "proficiency": { "id": 3, "value": "Expert" }, "ability": [ "read", "write", "speak" ], "lang": "Telugu", "languageId": "9a36114dacb02c31ed46328aa1d3d3a9d4b239b4e03ae3b211e56d4c06f64435", "entityLanguageId": "10", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de" } ], "noticePeriod": [], "disability": [ { "disabilityId": "", "profileId": "", "rawSubDisabilityId": null, "disabilityType": null, "subDisabilityType": null, "disabilityPercent": null, "disabilityReasonId": null, "disabilityReason": null, "certificateType": null, "certificateId": null } ], "onlineProfile": [], "presentation": [], "patent": [], "publication": [], "workSample": [], "profileAdditional": { "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "desiredJobTypeList": [ "internship", "contractual", "permanent" ], "fixedCtc": "400000", "variableCtc": "50000", "salaryDDId": 9502 }, "lookupData": { "resumeScore": 0, "int360RoleExp": "2026-01-28", "ppReviewed": false, "lastLoginTime": 1756036800659, "prevLoginTime": 1755963085912, "hasCurrentFullTimeEmployment": true, "isN360ProEligible": true, "isInt360paidUser": false }, "additionalDetails": { "curEmpVerEligibility": false, "isAIResumeEligible": true }, "profile": [ { "profileName": "Profile 1", "profileId": "772eec74918f556144732505dbb0a2395884f5cfa3c15c2bb679862093b973de", "name": "SANA SAMREEN", "keySkills": "Communication Skills,Oracle Database,Problem Solving,Python,UNIX,SQL,Leadership Skills,PL/SQL,Toad,PL/SQL (Procedures Functions Packages Triggers),UNIX Commands,Database Management,Production Support,Incident Management,Application Monitoring", "resumeHeadline": "Hi This is Sana Shaik, My roles and responsibilities are Handling incidents and working on production change request wchich raised by business users and also extensively working in SQL database, Unix commands using putty, tool like Team Quest for s", "birthDate": "1997-06-23", "gender": "F", "contactAddress": "Mig 2, 96, new housing board colony ", "mailCity": "gadwal , mahaboob Nagar,", "pincode": "509125", "maritalStatus": { "id": "M", "value": "Married" }, "industry": { "id": 25, "value": "IT-Software/Software Services" }, "functionalArea": { "id": 37, "value": "IT- Hardware / Telecom / Technical Staff / Support" }, "role": { "id": 2, "value": "Technical Support Mgr" }, "desiredJobType": [ "contractual", "permanent" ], "desiredEmploymentType": [ "Full Time" ], "locationPrefId": [ { "id": 15, "value": "Secunderabad" }, { "id": 6610, "value": "Remote" } ], "desiredIndustryTypeId": [], "negPrefIndustries": null, "shiftPrefTime": { "id": "D", "value": "Day" }, "expectedCtcCurrency": "INR", "expectedCtc": { "lacs": { "id": 10, "value": "10" }, "thousands": { "id": 0, "value": "0" } }, "absoluteExpectedCtc": "1000000", "category": null, "workStatus": null, "workPermitForCountry": [], "disability": { "isDisabled": "N" }, "noticePeriod": { "id": 2, "value": "1 Month" }, "city": { "id": 17, "value": "Hyderabad", "subValue": "" }, "country": { "id": 11, "value": "INDIA" }, "summary": "over 5 years of Hands-on experience in a Support Executive role. Have worked hard for customer satisfaction, always came up with solutions within time. Have used monitoring tools like Team Quest for various servers space usage and acted accordingly to cut the space whenever we received alerts. Currently Im learning Python and few oracle reports i.e. order to cash cycle and Internal sales order cycle through Udemy. skills 'PL/SQL', 'UNIX', 'Toad', 'Oracle',\n \"SQL\",\n \"PL/SQL (Procedures, Functions, Packages, Triggers)\",\n \"UNIX Commands\",\n \"Database Management\",\n \"Production Support\",\n \"Incident Management\",\n \"Application Monitoring\",\n \"Job Scheduling (Autosys)\",\n \"Error Handling in Reports\",\n \"Data Extraction & Analysis\",\n \"Release Activity Support\",\n \"Knowledge Transfer (KT) Documentation\",\n \"Toad for Oracle\",\n \"Toad for Data Point\",\n \"Tableau\",\n \"Splunk\",\n \"Autosys\",\n \"WinSCP\",\n \"PuTTY\", 'Communication','Oracle',, 'UNIX', 'Leadership' ", "experience": { "month": "0", "year": "6" }, "currency": "INR", "ctc": { "lacs": { "id": 5, "value": "5" }, "thousands": { "id": 95, "value": "95" } }, "absoluteCtc": "596000", "newLocationPrefId": [ { "id": 17, "value": "Hyderabad/Secunderabad" }, { "id": 9513, "value": "Remote" } ], "entityIndustryTypeId": { "id": 109, "value": "IT Services & Consulting" }, "entityIndustry": { "id": 109, "value": "IT Services & Consulting" }, "predictiveResumeHeadline": "IT Analyst  in Tata Consultancy Services (TCS) in Hyderabad", "lastModTime": "2025-08-24 17:35:32.0", "lastModAgo": "today", "joinDate": "", "profileFlag": "y", "predictiveFuncAreaId": 0, "incompleteSections": null, "desiredRole": [ { "id": 107, "value": "Data Analyst" }, { "id": 5897, "value": "PLSQL Developer" }, { "id": 135825, "value": "Production Support Software Engineer" } ], "entityDepartment": { "id": 8, "value": "IT & Information Security" }, "entityRoleCategory": { "id": 1044, "value": "IT Support" }, "entityRole": { "id": 383, "value": "IT Support - Other" }, "videoProfile": { "status": null, "exists": false }, "cvInfo": { "cvFormat": "pdf", "uploadDate": "2025-08-23 17:37:27", "fileName": "Resume_Shaik", "size": null, "sizeInKB": null, "textUploadDate": "2025-08-23", "source": "GENAI", "moderationStatus": 0, "isAvailable": true, "isTextResume": true }, "photoInfo": { "photoFormat": "jpg", "uploadDate": "2022-09-11 14:46:09", "status": "Approved", "photoURL": "https://media.naukri.com/media/jphotov1/l244%253ALukcMTq63gYbG7G3UwgEb541ynQnaMozg1t73K8ieriyfiIqzJjaJrrrFwoq", "isAvailable": true }, "isActiveProfile": true, "pc": 0 } ], "extendedProfile": { "sexualPref": null, "workDiversity": null, "careerBreak": { "data": [ { "comingFromBreak": false, "reasonOfBreak": null, "breakDuration": null, "description": null } ] }, "superPremium": null, "awards": null, "achievements": null, "exams": null, "mergedPlat": { "data": [ { "platform": "naukri", "flag": 1, "mergedDate": 1700013635347, "label": null, "isExternalPlatform": null } ] }, "jbSearchStatus": { "data": [ { "id": 1, "value": "Actively searching jobs" } ] }, "profileHighlights": null, "militaryExperience": null, "serviceType": null, "rank": null, "serviceNumber": null, "enrollmentDate": null, "dischargeDate": null, "customAccomplishments": null, "resdexAddPrefs": null, "tags": null, "profileSegment": { "data": [ { "profileSegment": "default", "modHistory": null } ] } }
}`
}

export const SRAVANI_DATA = {
  headerDetails: {
    accept: "application/json",
    acceptLanguage: "en-GB,en-US;q=0.9,en;q=0.8",
    appid: "109",
    authorization: "",
    clientid: "d3skt0p",
    contentType: "application/json",
    cookie: "",
    nkparam: "AhhqKzux+ACw+q+xhGvL4uSxzRil2BiRcBhp2UOUtxMQYnmmWNa1BWD0SfrHkeMmrqz8BCJMbSc7Clbwfyx3pg==",
    gid: "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE",
    priority: "u=1, i",
    referer: "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB",
    secChUa: "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    secChUaMobile: "?0",
    secChUaPlatform: "\"Linux\"",
    secFetchDest: "empty",
    secFetchMode: "cors",
    secFetchSite: "same-origin",
    systemid: "Naukri",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  },
  cookiePath: 'storage/sravani_latest.json',
  USER_NAME: 'SRAVANI',
  USER_EMAIL: 'SRAVANI',
  JOB_LISTS: 'jobshould_not_check_sravani.conf',
  JOB_LISTS_LIMIT: 900,
  URL_PART1: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_location&searchType=adv&location=india&pageNo=',
  URL_PART2: `&sort=f&functionAreaIdGid=5&wfhType=0&glbl_qcrc=1027&experience=3&clusters=functionalAreaGid%2CwfhType&functionAreaIdGid=5&wfhType=0&glbl_qcrc=1027&experience=3&seoKey=jobs-in-india-2&src=cluster&latLong=&sid=${new Date().getTime()}`,
  USER_NAMES: ['Ganji Sravani', 'Sravani Ganji', 'GANJI SRAVANI', 'Sravani G'  ,'G Sravani' ],
  referrer: 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB',
  USER_INFO: `Sravani Ganji ||  QA Engineer with 3 years of experience in Automation Testing, specializing in Selenium WebDriver, TestNG, and Cucumber. Proficient in Java and Python programming languages. Strong background in manual testing, API testing, and database testing. Holds a Results-Driven Quality Analyst | 3 years Experience in Automation & Manual Testing | Expertise in Selenium using Java, API Testing, and Agile Methodologies.Innovative Quality Analyst with 3 years months of experience specializing in Manual and Automation Testing within fast-paced, product-driven environments. Demonstrated expertise in creating robust test plans, automating test processes, and ensuring high-quality software delivery. Seeking to leverage my skills and experience to drive product excellence and contribute to the success of a leading product-based company Top 5 key skills: Selenium,Selenium Webdriver,Automation Testing,Functional Testing,Regression Testing Software Developer in Test (SDET) - Infor Internship Apr 2022 to Oct 2022 (7 months) Quality Assurance Analyst - Infor Full-time Apr 2022 to tilldate { "username": "sravaniganji5@gmail.com", "rawCtc": "8.35", "rawTotalExperience": "3.0", "totalSearchAppearancesLatestDate": "2025-04-10", "name": "Ganji Sravani", "education": {     "entityInstitute": {         "value": "Jawaharlal Nehru Technological University (JNTU)"     },     "course": "B.Tech/B.E.",     "institute": "Jawaharlal Nehru Technological University (JNTU)",     "spec": "Information Technology" }, "profileSegment": "default", "organization": "INFOR India Pvt Ltd", "desig": "Quality Analyst", "location": "Hyderabad", EXPECTED CTC : 12 LPA { "profile": [ { "profileName": "Profile 1", "profileId": "0c93864a84ee1d8854b98b3754af962237292df07a54da54113f03cb115cb3db", "name": "GANJI SRAVANI", "keySkills": "Automation Testing,Manual Testing,Selenium Webdriver,Playwright,Robot Framework,Java,Python,C Programming Language,Test script optimization,Agile Process,Agile Methodology,Robot,Waterfall,Jenkins,Scrum,Sprint Planning,API Testing,SQL,Selenium", "resumeHeadline": "Dynamic QA Engineer | 3+ Years in Automation & Manual Testing | Expert in Selenium, Java, API Testing | Driving Quality in Agile Environments", "birthDate": "2000-12-17", "gender": "F", "contactAddress": "", "mailCity": "miryalaguda", "pincode": "508207", "maritalStatus": { "id": null, "value": null
 }, "industry": { "id": 25, "value": "IT-Software/Software Services" }, "functionalArea": { "id": 67, "value": "IT Software - QA & Testing" }, "role": { "id": 7, "value": "Testing Engnr" }, "desiredJobType": [ "contractual", "permanent" ], "desiredEmploymentType": [ "Full Time" ], "locationPrefId": [ { "id": 15, "value": "Secunderabad" } ], "desiredIndustryTypeId": [], "negPrefIndustries": null, "shiftPrefTime": { "id": "D", "value": "Day" }, "expectedCtcCurrency": "INR", "expectedCtc": { "lacs": { "id": 13, "value": "13" }, "thousands": { "id": 50, "value": "50" } }, "absoluteExpectedCtc": "1350000", "category": { "id": 5, "value": "OBC - Non creamy" }, "workStatus": null, "workPermitForCountry": [], "disability": { "isDisabled": "N" }, "noticePeriod": { "id": 3, "value": "2 Months" }, "city": { "id": 351, "value": "Telangana", "subValue": "Hyderabad,India" }, "country": { "id": 11, "value": "INDIA" }, "summary": "Innovative QA Engineer with over 3 years of experience in automation and manual testing at Infor India Pvt Ltd, delivering high-quality software in fast-paced, Agile environments. Proficient in Selenium WebDriver, Java, Python, TestNG, and Cucumber, I specialize in creating robust test plans, automating complex workflows, and ensuring flawless product releases. Key achievements include streamlining testing processes to reduce defects by 30% and implementing API and database testing frameworks to enhance system reliability. Adept at functional and regression testing, I hold a B.Tech in IT from JNTU, Hyderabad. Passionate about driving excellence, I’m seeking to join a leading product-based company where I can leverage my expertise in automation testing and Agile methodologies to innovate and elevate software quality, contributing to cutting-edge solutions and team success.", "experience": { "month": "4", "year": "3" }, "currency": "INR", "ctc": { "lacs": { "id": 9, "value": "9" }, "thousands": { "id": 35, "value": "35" } }, "absoluteCtc": "937000", "newLocationPrefId": [ { "id": 17, "value": "Hyderabad/Secunderabad" } ], "entityIndustryTypeId": { "id": 110, "value": "Software Product" }, "entityIndustry": { "id": 110, "value": "Software Product" }, "predictiveResumeHeadline": " in in Hyderabad,India", "lastModTime": "2025-08-24 16:00:21.0", "lastModAgo": "today", "joinDate": "", "profileFlag": "y", "predictiveFuncAreaId": 0, "incompleteSections": null, "desiredRole": [], "entityDepartment": { "id": 5, "value": "Engineering - Software & QA" }, "entityRoleCategory": { "id": 1027, "value": "Quality Assurance and Testing" }, "entityRole": { "id": 252, "value": "Quality Assurance and Testing - Other" }, "videoProfile": { "status": null, "exists": false
 }, "cvInfo": { "cvFormat": "docx", "uploadDate": "2025-08-18 21:22:20", "fileName": "Sravani_G", "size": null, "sizeInKB": null, "source": null, "moderationStatus": null, "isAvailable": false, "isTextResume": false
 }, "photoInfo": { "photoFormat": "jpg", "uploadDate": "2024-09-10 22:14:28", "photoURL": "https://media.naukri.com/media/jphotov1/l244%253ALukcMTq91wAaHbq0XQgEbpoyy3Qmacoyg1t73K%252F8Zb%252F%252Bv9kQJcE387sAKu8%252B", "isAvailable": true
 }, "isActiveProfile": true, "pc": 0
 } ]
}
  `
}

export const PRASHANT_DATA = {
  headerDetails: {
    accept: "application/json",
    acceptLanguage: "en-GB,en-US;q=0.9,en;q=0.8",
    appid: "109",
    authorization: "",
    clientid: "d3skt0p",
    contentType: "application/json",
    cookie: "",
    nkparam: "AhhqKzux+ACw+q+xhGvL4uSxzRil2BiRcBhp2UOUtxMQYnmmWNa1BWD0SfrHkeMmrqz8BCJMbSc7Clbwfyx3pg==",
    gid: "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE",
    priority: "u=1, i",
    referer: "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB",
    secChUa: "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    secChUaMobile: "?0",
    secChUaPlatform: "\"Linux\"",
    secFetchDest: "empty",
    secFetchMode: "cors",
    secFetchSite: "same-origin",
    systemid: "Naukri",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  },
  cookiePath: 'storage/prashanth.json',
  USER_NAME: 'PRASHANTH',
  USER_EMAIL: 'PRASHANTH',
  JOB_LISTS: 'jobshould_not_check_prashanth.conf',
  JOB_LISTS_LIMIT: 900,
  // 1
  URL_PART1: 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=genai%2C%20nodejs%2C%20rag&sort=p&pageNo=',
  URL_PART2:`&experience=6&k=genai%2C%20nodejs%2C%20rag&experience=6&nignbevent_src=jobsearchDeskGNB&seoKey=genai-nodejs-rag-jobs&src=jobsearchDesk&latLong=&sid=${new Date().getTime()}`,
  USER_NAMES: ['Prashanth Ganji', 'Prashanth Ganji', 'PRASHANTH GANJI', 'Prashanth G'  ,'G Prashanth' , 'Prashanth' ],
  referrer: 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB',
  USER_INFO: `Phone: 7842512613; Email: prashanthganji2021@gmail.com; Name: Prashanth Ganji; Location: Hyderabad; Total Exp: 6Y; Node.js: 6Y; Angular: 2.5Y; AWS: 2Y; JavaScript: 6Y; TypeScript: 5Y; MongoDB: 6Y; PostgreSQL: 6Y; MERN: 6Y; MEAN: 6Y; Express: 6Y; GraphQL: 2Y; Playwright: Yes; RabbitMQ: Yes; Nginx: Yes; Current CTC: 14.65 LPA; Expected CTC: 18 LPA; Notice Period: 90 days (3 Months); Desired Roles: Mean Stack Developer, Senior Backend Developer, Senior Frontend Developer; Preferred Locations: Hyderabad, Bangalore, Pune
  `
}


// export const BACKEND_API_ENDPOINTS = {
//   JOB_LISTING: 'https://sendemail2hr.netlify.app/api/joblistNaukari',
//   SAVE_JOB: 'https://sendemail2hr.netlify.app/api/insertJoblistNaukari',
//   GET_COOKIES: 'https://sendemail2hr.netlify.app/api/getCookies',
//   GET_JOB_CONFIG: 'https://sendemail2hr.netlify.app/api/getJobConfig',
// }

export const BACKEND_API_ENDPOINTS = {
  JOB_LISTING: 'https://sendemail2hr.netlify.app/api/joblistNaukari',
  SAVE_JOB: 'https://sendemail2hr.netlify.app/api/insertJoblistNaukari',
  GET_COOKIES: 'https://sendemail2hr.netlify.app/api/getCookies',
  GET_JOB_CONFIG: 'https://sendemail2hr.netlify.app/api/getJobConfig',
  SAVE_COOKIES: 'https://sendemail2hr.netlify.app/api/saveCookies',
  SAVE_JOB_CONFIG: 'https://sendemail2hr.netlify.app/api/saveJobConfig',
}



// https://www.naukri.com/jobs-in-india?clusters=functionalAreaGid%2CwfhType&functionAreaIdGid=5&glbl_qcrc=1027&cityTypeGid=17&experience=3
