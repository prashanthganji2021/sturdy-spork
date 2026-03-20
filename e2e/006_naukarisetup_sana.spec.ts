// https://www.naukri.com/node-dot-js-node-js-developer-react-dot-js-node-jobs?k=node.js%2C%20node%20js%20developer%2C%20react.js%2C%20node&nignbevent_src=jobsearchDeskGNB&experience=2&cityTypeGid=17&cityTypeGid=97&cityTypeGid=134&cityTypeGid=139&cityTypeGid=9509&jobAge=1

import { test, expect, BrowserContext, Page } from '@playwright/test';
import { applyForJobIfNotApplied, applyNaukariJob, generateEmailContent, getAllJobs, navigateAndCategorizeJobs } from './helper';
// json to csv
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()

// Use stealth plugin with Playwright
chromium.use(stealth)

const url = 'http://localhost:4200'; // Adjust the URL if needed

// browser context of all tests in this file
test.use({ baseURL: url });

let context: BrowserContext;
let page: Page;
let page2: Page;
interface Job {
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  tags: string;
  jobDesc: string;
  url: string;
}

let userInfo = `'Sana Samreen Shaik, IT Support Executive with over 4 years of experience in SQL, PL/SQL, and UNIX commands. Proficient in tools like Toad for Oracle, Tableau, Splunk, and Autosys. Hands-on experience in production support, job monitoring, database handling, and application health checks. Work experience includes TCS projects for Bank of America (Nov 2022–Present) and Cigna (July 2019–Nov 2022). Holds an M.Tech in Mechanical Engineering from JNTU, Hyderabad. locationOt Hyderabad, INDIA || experienceOneTheme|| 5 Years 3 Months|| walletOneTheme|| ₹ 5,96,000|| phoneOneTheme|| 8897792687|| verifiedOneTheme mailOneTheme|| sana.samreen2903@gmail.com|| verifiedOneTheme|| calenderOneTheme|| 2 Months notice period|| Notice Period: Immediate || SQL Experience: 4+ years || UNIX Experience: 4+ years || Current Location: Gadwal, Telangana ||
CTC: ₹5,50,000 || ECTC: ₹10,00,000 || Female || 24/03/1996 || Mobile: 8897792687 || Email: sana.samreen2903@gmail.com`
let URL = 'https://www.naukri.com/plsql-unix-sql-jobs?k=plsql%2C%20unix%20sql&nignbevent_src=jobsearchDeskGNB&experience=5&wfhType=0&jobAge=1&qbusinessSize=62&qbusinessSize=63&qbusinessSize=211&qbusinessSize=215&qbusinessSize=217&cityTypeGid=17'
let jobData: Job[] = [];
let applyJobs: Job[] = [];
let nowApplyingJobs: Job[] = [];
let limitCrossed = false;

let NAME = 'SANA'
let mySkills = ['PL/SQL', 'UNIX', 'Toad', 'Oracle',
  "PL/SQL (Procedures, Functions, Packages, Triggers)",
  "UNIX Commands",
  "Database Management",
  "Production Support",
  "Incident Management",
  "Application Monitoring",
  "Job Scheduling (Autosys)",
  "Error Handling in Reports",
  "Data Extraction & Analysis",
  "Release Activity Support",
  "Knowledge Transfer (KT) Documentation",
  "Toad for Oracle",
  "Toad for Data Point",
  "Tableau",
  "Splunk",
  "Autosys",'Procurement',
  "WinSCP",
  "PuTTY", 'Communication','Oracle', 'UNIX', 'Leadership'
]
let canApplyJobs = [];
let otherJobs:any = [];
let companyJobs = [];
let heeader : any= {
}

test.describe('NaUKARI Sequential Tests with Shared Context', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ storageState: 'storage/sana.json' });

  test.beforeAll(async ({ }) => {
    const browser = await chromium.launch({ headless: true });

    context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
      locale: 'en-US',
      timezoneId: 'Asia/Kolkata',
    });

    page = await context.newPage();
    page2 = await context.newPage();


  });

  // Clean up the shared context after all tests
  test.afterAll(async () => {
    await page.close();
    await page2.close();
    await context.close();
  });

  // test('Test 1 - Login to platform1', async () => {
  //   console.log('Test 1');
  //   await page.bringToFront();
  //   await page.goto('https://send2hr.xyz/login');
  //   await page.getByPlaceholder('Email address/Username').fill('ganjiprashanth28@gmail.com');
  //   await page.getByRole('button', { name: 'Continue' }).click();
  //   await page.getByPlaceholder('Password').fill('Ganji@123');
  //   await page.getByRole('button', { name: 'Sign In' }).click();






  // });
  // test('Test 2 - NAUKARI Login and Element Check2', async ({ request }, testInfo) => {
  //   testInfo.setTimeout(60*1000*3); // Set a test timeout for 5 minutes
  //   await page2.bringToFront();
  //   await page2.pause();
  //   const pendingJobsList  = await navigateAndCategorizeJobs(page2, jobData, context, limitCrossed, applyJobs, nowApplyingJobs, URL)
  //   jobData = pendingJobsList.jobData;
  //   limitCrossed = pendingJobsList.limitCrossed;
  //   applyJobs = pendingJobsList.applyJobs;
  //   nowApplyingJobs = pendingJobsList.nowApplyingJobs;
  //   console.log('nowApplyingJobs', nowApplyingJobs);
  //   // for (const job of pendingJobsList.nowApplyingJobs) {
  //   //   try {
  //   //     await applyNaukariJob(job, request, page2, userInfo)
  //   //   } catch (error) {
  //   //   }
  //   // }
  // });




  // test('Test 3 - mail all the job listings22', async () => {
  //   await page.bringToFront();
  //   await page.getByRole('button', { name: 'Custom Email' }).click();
  //   if (applyJobs.length) {
  //     if(applyJobs.length > 50){
  //       applyJobs = applyJobs.slice(0, 50);
  //     }

  //     let HTMLContent = generateEmailContent(applyJobs);
  //     await page.getByRole('button', { name: 'Raw' }).click();
  //     await page.getByPlaceholder('Enter email content').fill(HTMLContent)
  //     await page.getByPlaceholder('Email address').fill('sanasamreen2304@gmail.com');
  //     await page.getByPlaceholder('Enter subject').fill(`Job Listings Naukari for ${new Date().toLocaleDateString()}`);
  //     await page.getByRole('button', { name: 'Raw' }).click();
  //     await expect(page.locator('button').filter({ hasText: /^Send$/ })).toBeVisible();
  //     await page.locator('button').filter({ hasText: /^Send$/ }).first().click();
  //     await page.waitForTimeout(8000);
  //   }
  // })


    test('Test 22 - Login to pdefdlatform1', async () => {

      await page.goto('https://www.naukri.com/job-listings-node-js-developer-peoplexm-technologies-bengaluru-3-to-6-years-150125009546?src=jobsearchDesk&sid=17369567374138543&xp=1&px=1&nignbevent_src=jobsearchDeskGNB');
      await page.waitForTimeout(5000);
      await page.context().storageState({ path: 'storage/sana.json' });
      const cookies = await context.cookies();
      const nukriCookie = cookies.filter(data => data.domain == '.naukri.com')
      const cookieString = nukriCookie.map(cookie => `${cookie.name}:${cookie.value}`).join('; ');

      heeader.cookie =  cookieString
      heeader.authorization = `Bearer ${cookies.filter(data => data.name ==  'nauk_at')[0].value}`

      console.log('Test 1');
      // await page.goto('https://send2hr.xyz/login');
      // await page.getByPlaceholder('Email address/Username').fill(USERID);
      // await page.getByRole('button', { name: 'Continue' }).click();
      // await page.getByPlaceholder('Password').fill('Ganji@123');
      // await page.getByRole('button', { name: 'Sign In' }).click();
      // await page.waitForTimeout(5000);
      // const storage =await page.evaluate(() => {
      //   return localStorage.getItem('userInfo');
      // });
    });
    test('Test 21 - Login to plaftform1', async ({ request }, testInfo) => {
      testInfo.setTimeout(60*1000*10);

      let jobList = await getAllJobs( heeader, NAME, context, mySkills);

      // let canApplyJobs: any = [];
      // for (let i = 0; i < jobList.length; i++) {
      //   const job = jobList[i];
      //   if (job.tagsAndSkills && mySkills.some(skill => job.tagsAndSkills.includes(skill))) {
      //     canApplyJobs.push(job);
      //   }
      // }
      otherJobs = jobList
      console.log('otherJobs', otherJobs.length);

      // await page.bringToFront();
      // await page.locator('a').filter({ hasText: /^Naukari$/ }).first().click();
      // await page.getByRole('button', { name: 'Config' }).click();
      // let chunk_size = 100

      // for (let i = 0; i < companyJobs.length; i += chunk_size) {
      //   let chunk = companyJobs.slice(i, i + chunk_size);
      //   await page.getByPlaceholder('Enter JSON here...').fill(JSON.stringify(chunk));
      //   await page.getByRole('button', { name: 'Analyze Data JSON' }).click();
      //   await page.getByRole('button', { name: 'Save Data JSON' }).click();
      //   await page.waitForTimeout(3000);
      // }
    });

    test('Test 22 - NAUKARI Login and Elefment Check', async ({ request }, testInfo) => {

      for (const job of otherJobs) {
        try {
          await applyForJobIfNotApplied(job, heeader);
        } catch (error) {
        }
      }
    });

});
