
import { test, BrowserContext, Page } from '@playwright/test';
import { applyForJobIfNotApplied, getAllJobs } from './helper';
// json to csv
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()
chromium.use(stealth)

const url = 'http://localhost:4200';
test.use({ baseURL: url });

let context: BrowserContext;
let page: Page;
let page2: Page;
let USERID = 'ganjiprashanth28@gmail.com'
let NAME = 'ANIL'
let mySkills = ['Node', 'React', 'Rest', 'react', 'Restful', 'API', 'Javascript', 'postgresql', 'express', 'mongodb', 'typescript', 'javascript', 'HTML', 'CSS', 'Git', 'MySQL'];

test.describe('NaUKARI Sequential Tests with Shared Context', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ storageState: 'storage/admin.json' });

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


  let canApplyJobs = [];
  let otherJobs:any = [];
  let companyJobs = [];
  let heeader : any= {
  }
  test('Test 1 - Login to pdefdlatform1', async () => {

    await page.goto('https://www.naukri.com/job-listings-node-js-developer-peoplexm-technologies-bengaluru-3-to-6-years-150125009546?src=jobsearchDesk&sid=17369567374138543&xp=1&px=1&nignbevent_src=jobsearchDeskGNB');
    await page.waitForTimeout(5000);

    await page.context().storageState({ path: `storage/admin.json` });
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
  test('Test 1 - Login to plaftform1', async ({ request }, testInfo) => {
    testInfo.setTimeout(60*1000*10);

    let jobList = await getAllJobs( heeader, NAME, context, mySkills);

    let canApplyJobs: any = [];
    for (let i = 0; i < jobList.length; i++) {
      const job = jobList[i];
      if (job.tagsAndSkills && mySkills.some(skill => job.tagsAndSkills.includes(skill))) {
        canApplyJobs.push(job);
      }
    }
    otherJobs = canApplyJobs

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

  test('Test 2 - NAUKARI Login and Elefment Check', async ({ request }, testInfo) => {

    for (const job of otherJobs) {
      try {
        await applyForJobIfNotApplied(job, heeader);
      } catch (error) {
      }
    }
  });











});

