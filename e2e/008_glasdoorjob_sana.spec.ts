
import { test, expect, BrowserContext, Page } from '@playwright/test';
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()

chromium.use(stealth)

const url = 'http://localhost:4200'; // Adjust the URL if needed

test.use({ baseURL: url });

let context: BrowserContext;
let page: Page;
let page2: Page;


let jobData: any[] = [];


test.describe('1glasdoor Sequential Tests with Shared Context', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ storageState: 'storage/admin.json' });
  test.skip()

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

  test.afterAll(async () => {
    await page.close();
    await page2.close();
    await context.close();
  });

  test('1Test 1 - Login to platform1', async () => {
    await page.bringToFront();
    await page.goto('https://send2hr.xyz/login');
    await page.getByPlaceholder('Email address/Username').fill('ganjiprashanth28@gmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('Password').fill('Ganji@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();

  });

  test('1Test 2 - glassdoor Login and Element Check', async ({}, testInfo) => {
    console.log('Test 2');
    testInfo.setTimeout(90000);
    testInfo.slow();
    await page2.bringToFront();
    await page2.goto('https://www.glassdoor.co.in/Job/hyder%C4%81b%C4%81d-plsql-jobs-SRCH_IL.0,9_IC2865319_KO10,15.htm?fromAge=1&cityId=2865319&employerSizes=4&minRating=4.0');
    await page2.waitForLoadState('domcontentloaded');

    await loadMoreJobs();
    await loadMoreJobs();
    let allJobs = await page2.locator('.jobCard');
    for (let i = 0; i < await allJobs.count(); i++) {

      let job = await page2.locator('.jobCard').nth(i);
      let title = await job.locator('[data-test="job-title"]').textContent();
      // let location = await job.locator('[data-test="emp-location"]').textContent();
      let location:any = '';
      if(await job.locator('div:has-text("Location:")').last().isVisible()){
         location = await job.locator('div:has-text("Location:")').last().textContent();
      }
      let tags:any = '';
      if(await job.locator('div:has-text("Skills:")').last().isVisible()){
         tags = await job.locator('div:has-text("Skills:")').last().textContent();
      }
      let url = await job.locator('[data-test="job-title"]').getAttribute('href');



      jobData.push({
        title: JSON.parse(JSON.stringify(title || '')),
        location: JSON.parse(JSON.stringify(location || '')),
        tags: JSON.parse(JSON.stringify(tags || '')),
        url: JSON.parse(JSON.stringify(url || '')),
      });


    }





  });


  test('1Test 3 - mail all the job listings glassdoor', async () => {
    console.log('Test 3');
    // email all the job listings
    await page.bringToFront();
    await page.getByRole('button', { name: 'Custom Email' }).click();
    if(jobData.length){
    let HTMLContent = generateEmailContent(jobData);
    await page.getByRole('button', { name: 'Raw' }).click();
    await page.getByPlaceholder('Enter email content').fill(HTMLContent)
    await page.getByPlaceholder('Email address').fill('sanasamreen2304@gmail.com');
    await page.getByPlaceholder('Enter subject').fill(`Job Listings for Glassdoor ${new Date().toLocaleDateString()}`);
    await page.getByRole('button', { name: 'Raw' }).click();
    await expect(page.locator('button').filter({ hasText: /^Send$/ })).toBeVisible();
    await page.locator('button').filter({ hasText: /^Send$/ }).first().click();
    await page.waitForTimeout(8000);
    }
  });




});



function generateEmailContent(jobData: any[]): string {
  let title = `Job Listings Glassdoor for ${new Date().toLocaleDateString()}  <br>\n A total of ${jobData.length} jobs were found in Last 24 hours. <br>\n`;



  let HTMLContent = `
    <div style="font-family: Arial, sans-serif; color: #333; margin: 20px;">
      <h1 style="color: #3498db;">${title}</h1>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Title</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Location</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; color: #333;">Tags</th>
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
        <td style="border: 1px solid #ddd; padding: 8px;">${job.location}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${job.tags}</td>
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




async function loadMoreJobs() {
  if (await page2.locator('[data-test="load-more"]').isVisible()) {
    await page2.locator('[data-test="load-more"]').click();
  }

  if (await page2.locator('[data-test="authModalContainerV2-content"]').isVisible()) {
    await page2.locator('[data-test="authModalContainerV2-content"]').getByRole('button').first().click();
  }
}

