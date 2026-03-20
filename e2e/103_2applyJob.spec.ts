import { test, expect, BrowserContext, Page } from '@playwright/test';
import { JobManager } from './joblist';
import { ANIL_DATA, SRAVANI_DATA } from './constants';
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()
chromium.use(stealth)
let context: BrowserContext;
let page: Page;
let page2: Page;
let emailList: string[] = [];

test.describe('JOB LISTING AND APPLsY', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ storageState: SRAVANI_DATA.cookiePath });

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




  test('JOB sLIST', async ({ request }, testInfo) => {
    let Data: any = SRAVANI_DATA
    Data.context = context;
    Data.page = page;
    Data.request = request;

    const jobManager = new JobManager(Data);
    await jobManager.getJobList();
  });



});

