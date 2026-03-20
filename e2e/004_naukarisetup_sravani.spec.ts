// https://www.naukri.com/node-dot-js-node-js-developer-react-dot-js-node-jobs?k=node.js%2C%20node%20js%20developer%2C%20react.js%2C%20node&nignbevent_src=jobsearchDeskGNB&experience=2&cityTypeGid=17&cityTypeGid=97&cityTypeGid=134&cityTypeGid=139&cityTypeGid=9509&jobAge=1

import { test, expect, BrowserContext, Page } from '@playwright/test';
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

let jobData: Job[] = [];


test.describe('2NaUKARI Sequential Tests with Shared Context', () => {
  // make series of tests share the same context
  test.describe.configure({ mode: 'serial' });
  // use session storage and local storage
  test.use({ storageState: 'storage/admin.json' });

  // Set up the shared context before all tests
  test.beforeAll(async ({  }) => {
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

  test('2NaUKARITest 1 - Login to platform1', async () => {
    console.log('Test 1');
    await page.bringToFront();
    await page.goto('https://send2hr.xyz/login');
    await page.getByPlaceholder('Email address/Username').fill('test@gmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('Password').fill('Ganji@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // // save cookies and local storage and session storage for later use
    // await page.context().storageState({ path: `storage/admin.json` });






  });

  test('2NaUKARITest 2 - NAUKARI Login and Element Check', async ({}, testInfo) => {
    console.log('Test 2');
    testInfo.setTimeout(90000);
    testInfo.slow();
    await page2.bringToFront();
    // await page2.goto('https://www.naukri.com/node-dot-js-node-js-developer-react-dot-js-node-jobs?k=node.js%2C%20node%20js%20developer%2C%20react.js%2C%20node&nignbevent_src=jobsearchDeskGNB&experience=2&jobAge=1&functionAreaIdGid=5&qbusinessSize=62&qbusinessSize=211&cityTypeGid=17&cityTypeGid=97&cityTypeGid=183&cityTypeGid=9508&cityTypeGid=9509');
    await page2.goto('https://www.naukri.com/qa-testing-jobs-in-hyderabad-secunderabad?cityTypeGid=17&jobAge=1&jobPostType=1&qbusinessSize=213&qbusinessSize=217&glbl_qcrc=1027&industryTypeIdGid=109');
    await page2.waitForTimeout(9000);
    await page2.waitForLoadState('domcontentloaded');
    await collectAllJobListings(jobData);





  });

  test('2NaUKARITest 3 - mail all the job listings', async () => {
    console.log('Test 3');
    // email all the job listings
    await page.bringToFront();
    await page.getByRole('button', { name: 'Custom Email' }).click();

if(jobData.length){
  let HTMLContent = generateEmailContent(jobData);
  await page.getByRole('button', { name: 'Raw' }).click();
  await page.getByPlaceholder('Enter email content').fill(HTMLContent)
  await page.getByPlaceholder('Email address').fill('srinivasganji1234@gmail.com');
  await page.getByPlaceholder('Enter subject').fill(`Job Listings Naukari for ${new Date().toLocaleDateString()}`);
  await page.getByRole('button', { name: 'Raw' }).click();
  await expect(page.locator('button').filter({ hasText: /^Send$/ })).toBeVisible();
  await page.locator('button').filter({ hasText: /^Send$/ }).first().click();
  await page.waitForTimeout(8000);

}
  })





});


async function collectJobListings(jobData: any) {


if(await page2.getByText('No results found').isVisible()){
  return
}
  // await page2.pause();
  await page2.locator('.srp-jobtuple-wrapper').first().waitFor({ state: 'visible' });
  console.log('Job Listings are visible');
  let allJobs = await page2.locator('.srp-jobtuple-wrapper');
  let totalJobsinPage = await allJobs.count();
  // console.log('Total Jobs:', totalJobsinPage);
  for (let i = 0; i < totalJobsinPage; i++) {
    // let job = allJobs[i];
    let job = await page2.locator('.srp-jobtuple-wrapper').nth(i);
    await job.scrollIntoViewIfNeeded();
    // let title = await job.locator('.title').innerText();
    // let company = await job.locator('.comp-name').innerText();
    // let location = await job.locator('.locWdth').innerText();
    // let experience = await job.locator('.expwdth').innerText();
    // let salary = await job.locator('.sal').innerText();
    // let tags = await job.locator('.tags-gt').innerText();
    // let jobDesc = await job.locator('.job-desc').innerText();

    let title = "no title";
    if(await job.locator('.title').isVisible()){
      title = await job.locator('.title').innerText();
    }
    let company = "no company";
    if(await job.locator('.comp-name').isVisible()){
      company = await job.locator('.comp-name').innerText();
    }
    let location = "no location";
    if(await job.locator('.locWdth').isVisible()){
      location = await job.locator('.locWdth').innerText();
    }
    let experience = "no experience";
    if(await job.locator('.expwdth').isVisible()){
      experience = await job.locator('.expwdth').innerText();
    }
    let salary = "no salary";
    if(await job.locator('.sal').isVisible()){
      salary = await job.locator('.sal').innerText();
    }
    let tags = "no tags";
    if(await job.locator('.tags-gt').isVisible()){
      tags = await job.locator('.tags-gt').innerText();
    }
    let jobDesc = "no job description";
    if(await job.locator('.job-desc').isVisible()){
      jobDesc = await job.locator('.job-desc').innerText();
    }

    let data = {
      title,
      company,
      location,
      experience,
      salary,
      tags,
      jobDesc,
      url: await job.locator('.title').getAttribute('href')
    };
    // console.log('Job:', data);

    jobData.push(data);
  }
}

async function collectAllJobListings(jobData) {
  // Collect job listings on the current page
  await collectJobListings(jobData);
  // console.log('Job Data:', jobData);

  // Check if "Next" button is visible
  if (await page2.getByRole('link', { name: 'Next ' }).isVisible()) {
      await page2.getByRole('link', { name: 'Next ' }).click(); // Go to the next page
      await page2.waitForNavigation(); // Wait for the page to load
      await page2.waitForTimeout(4000); // Wait for 2 seconds
      // Recursively call the function to collect data from the next page
      if(!await page2.getByText('No results found').isVisible()){
        await collectAllJobListings(jobData);
      }

  } else {
      console.log('No More Jobs');
  }
}





function generateEmailContent(jobData: Job[]): string {
  let title = `Job Listings for ${new Date().toLocaleDateString()}  <br>\n A total of ${jobData.length} jobs were found in Last 24 hours. <br>\n`;



  let HTMLContent = `
    <div style="font-family: Arial, sans-serif; color: #333; margin: 20px;">
      <h1 style="color: #3498db;">${title}</h1>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Title</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Company</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Location</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Experience</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Salary</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Tags</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Job Description</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let job of jobData) {
    HTMLContent += `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">
          <a href="${job.url}" style="color: #3498db; text-decoration: none;" target="_blank">${job.title}</a>
        </td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.company}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.location}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.experience}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.salary}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.tags}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.jobDesc}</td>
      </tr>
    `;
  }

  HTMLContent += `
      </tbody>
    </table>
    <p style="font-family: Arial, sans-serif; color: #555; text-align: center; margin-top: 20px;">
      Best of luck with your job search!<br>
      <i>Your Job Finder Team</i>
    </p>
  `;

  return HTMLContent;
}
