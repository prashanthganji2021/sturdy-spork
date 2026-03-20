import { test, expect, BrowserContext, Page } from '@playwright/test';
// json to csv
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()

// Use stealth plugin with Playwright
chromium.use(stealth)

// browser context of all tests in this file


let context: BrowserContext;
let page: Page;
let page2: Page;
let emailList: string[] = [];

test.describe('1Sequential Tests with Shared Context', () => {
  // make series of tests share the same context
  test.describe.configure({ mode: 'serial' });
  // use session storage and local storage
  test.use({ storageState: 'storage/admin.json' });

  // Set up the shared context before all tests
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

  test('1Test 1 - Login to platform', async () => {
    console.log('Test 1');
    await page.bringToFront();
    await page.goto('https://send2hr.xyz/login');
    await page.getByPlaceholder('Email address/Username').fill('sanasamreen2304@gmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('Password').fill('Ganji@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
    // // save cookies and local storage and session storage for later use
    // await page.context().storageState({ path: `storage/admin.json` });





  });

  test('1Test 2 - LinkedIn Login and Element Check', async () => {
    console.log('Test 2');
    // Bring page2 to the front before interacting with it
    await page2.bringToFront();


    await page2.goto('https://www.linkedin.com/');
    // await page2.waitForTimeout(2000);
    // await page2.locator('[data-test-id="home-hero-sign-in-cta"]').click();
    // await page2.waitForTimeout(2000);
    // await page2.getByLabel('Email or phone').waitFor({ state: 'visible' });
    // await page2.getByLabel('Email or phone').fill('ganjiprashanth28@gmail.com');
    // await page2.getByLabel('Password').fill('Ganji@123');
    // await page2.getByLabel('Sign in', { exact: true }).waitFor({ state: 'visible' });
    // await expect(page2.getByLabel('Sign in', { exact: true })).toBeVisible();
    // await page2.waitForTimeout(2000);
    // await page2.getByLabel('Sign in', { exact: true }).click();
    await page2.waitForTimeout(5000);
    await page2.getByRole('link', { name: 'G Prashanth full stack' }).waitFor({ state: 'visible' });
    await expect(page2.getByRole('link', { name: 'G Prashanth full stack' })).toBeVisible();
    await expect(page2.getByLabel('Add media')).toBeVisible();


  });



  test('1Test 3 - LinkedIn Login and Element Check', async ({}, testInfo) => {
    console.log('Test 3');
    // increase timeout for this test
    testInfo.setTimeout(600000); // 5 minutes


    // await page2.goto('https://www.linkedin.com/search/results/content/?datePosted=%22past-month%22&keywords=nodejs%20%20%23hiring%20email&origin=FACETED_SEARCH&sid=7zd');
    await page2.goto('https://www.linkedin.com/search/results/content/?datePosted=%22past-month%22&keywords=pl%2Fsql%20developer%20%20%23hiring%20email&origin=GLOBAL_SEARCH_HEADER&sid=%40zO&sortBy=%22date_posted%22');
    // await page2.goto('https://www.linkedin.com/search/results/content/?keywords=react%20%20%23hiring%20email&origin=SWITCH_SEARCH_VERTICAL&sid=k)V');
    await page2.waitForTimeout(2000);
    // await page2.getByPlaceholder('Search', { exact: true }).waitFor({ state: 'visible' });
    // await page2.getByPlaceholder('Search', { exact: true }).fill('nodejs React developer email');
    // await page2.getByPlaceholder('Search', { exact: true }).press('Enter');
    // await page2.getByRole('link', { name: 'Filter by Past 24 hours' }).waitFor({ state: 'visible' });
    // await expect(page2.getByRole('link', { name: 'Filter by Past 24 hours' })).toBeVisible();
    // await page2.getByRole('link', { name: 'Filter by Past 24 hours' }).click();

    // Scroll down multiple times
    emailList = await collectEmailAddresses(emailList);









  });

  test('1Test 4more - LinkedIn Login and Element Check', async ({}, testInfo) => {
    console.log('Test 3');
    // increase timeout for this test
    testInfo.setTimeout(600000); // 5 minutes


    // await page2.goto('https://www.linkedin.com/search/results/content/?datePosted=%22past-month%22&keywords=nodejs%20%20%23hiring%20email&origin=FACETED_SEARCH&sid=7zd');
    await page2.goto('https://www.linkedin.com/search/results/content/?datePosted=%22past-month%22&keywords=pl%2Fsql%20%20hyderabad%20%23hiring%20email&origin=GLOBAL_SEARCH_HEADER&sid=s7F&sortBy=%22date_posted%22');
    // await page2.goto('https://www.linkedin.com/search/results/content/?keywords=react%20%20%23hiring%20email&origin=SWITCH_SEARCH_VERTICAL&sid=k)V');
    await page2.waitForTimeout(2000);
    // await page2.getByPlaceholder('Search', { exact: true }).waitFor({ state: 'visible' });
    // await page2.getByPlaceholder('Search', { exact: true }).fill('nodejs React developer email');
    // await page2.getByPlaceholder('Search', { exact: true }).press('Enter');
    // await page2.getByRole('link', { name: 'Filter by Past 24 hours' }).waitFor({ state: 'visible' });
    // await expect(page2.getByRole('link', { name: 'Filter by Past 24 hours' })).toBeVisible();
    // await page2.getByRole('link', { name: 'Filter by Past 24 hours' }).click();

    // Scroll down multiple times
    emailList = await collectEmailAddresses(emailList);









  });

  test('1Test 4 - LinkedIn Login and Element Check', async ({}, testInfo) => {
    console.log('Test 4');
    // increase timeout for this test
    testInfo.setTimeout(60*1000*3); // 5 minutes
  //  email all the email addresses
  await page.bringToFront();
  for (let i = 0; i < emailList.length; i++) {
    await page.getByPlaceholder('Email address').fill(emailList[i]);
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    console.log('Email Sent to:', emailList[i]);
    await page.waitForTimeout(3000);
  }



  });

});
async function collectEmailAddresses(emailList: string[]) {
  console.log('Collecting Email Addresses');
  await page2.locator('.feed-shared-update-v2').last().waitFor({ state: 'visible' });
  for (let i = 0; i < 7; i++) {
    console.log('Scrolling:', i);
    await scrollAndExpandResults();
    await scrollAndExpandResults();
    await scrollAndExpandResults();
    await scrollAndExpandResults();
    await scrollAndExpandResults();
  }
  console.log('Scrolling Done');

  // Get see more buttons
  let seeMoreButtons = page2.getByLabel('see more, visually reveals');
  const seeMoreButtonsCount = await seeMoreButtons.count();
  console.log('See More Buttons Count:', seeMoreButtonsCount);
  let skipRun = false;
  for (let i = 0; i < seeMoreButtonsCount; i++) {
    // await seeMoreButtons.nth(i).click();
    if(!skipRun){
    if (await seeMoreButtons.nth(i).isVisible()) {

      await seeMoreButtons.nth(i).click();
      const emailElements = await page2.locator('a[href^="mailto:"]');
      const emailCount = await emailElements.count();
      console.log('Email Count:', emailCount);
      for (let i = 0; i < emailCount; i++) {
        const emailElementText = await emailElements.nth(i).innerText(); // Get inner text of each email link
        emailList.push(emailElementText);
      }
      skipRun = true;
    } else {
      console.log('Button not visible');
    }
  }
  }
  emailList = emailList.filter((item, index) => emailList.indexOf(item) === index && item !== '');
  // remove email having @gmail.com
  emailList = emailList.filter(email => !email.includes('@gmail.com'));

  console.log('Email List:', emailList);
  return emailList;
}

async function scrollAndExpandResults() {
  await page2.waitForTimeout(2000);

  if(await page2.locator('.feed-shared-update-v2').last().isVisible()){
    await page2.locator('.feed-shared-update-v2').last().press('ArrowDown');
  }
  // await page2.waitForTimeout(1000);
  // jf-ext-button-ct="show more results"
  if (await page2.getByRole('button', { name: 'Show more results' }).isVisible()) {
    await page2.getByRole('button', { name: 'Show more results' }).click();
  }
}
// https://www.naukri.com/quality-analyst-software-testing-sdet-automation-testing-jobs?k=quality%20analyst%2C%20software%20testing%2C%20sdet%2C%20automation%20testing&nignbevent_src=jobsearchDeskGNB&experience=3&jobAge=3&cityTypeGid=17&qbusinessSize=211&qbusinessSize=213&qbusinessSize=217&functionAreaIdGid=3&functionAreaIdGid=5&functionAreaIdGid=8&functionAreaIdGid=13
