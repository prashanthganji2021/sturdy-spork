export async function applyNaukariJob(job, request, page2, userInfo) {
  await page2.bringToFront();
  await page2.goto(job.staticUrl);
  await page2.waitForTimeout(3000);
  await page2.locator('div').filter({ hasText: /^Job match score$/ }).waitFor({ state: 'visible' });
  if (await page2.locator('#job_header').getByText('Applied').isVisible()) {
    return;
  }

  await page2.getByRole('button', { name: 'Apply' }).click();

  await page2.waitForTimeout(3000);
  let chatBot = await page2.locator('.chatbot_MessageContainer');


  let submitted = false

  while (await chatBot.isVisible() && !submitted) {
    let questionL = await chatBot.locator('.chatbot_ListItem');

    for (let j = 0; j < await questionL.count(); j++) {
      let case1 = await chatBot.getByText('I Accept').isVisible();
      let case2 = await page2.locator('div[data-placeholder="Type message here..."]').isVisible();
      let case3 = await chatBot.locator('.ssrc__radio-btn-container').first().isVisible();
      let case4 = await chatBot.locator('.multicheckboxes-container').first().isVisible();
      if (case1) {
        await chatBot.getByText('I Accept').click();
        await page2.getByText('Save').last().click();
        await page2.waitForTimeout(1000);
        let newUrl = await page2.url();
        if (newUrl !== job.staticUrl) {
          return;
        }
      } else if (case2) {

        let type = 'input';
        let questionElement = chatBot.locator('.botMsg').nth(j);
        let question = await questionElement.allInnerTexts();
        if (question.length && question[0]?.trim() !== '' && !(new RegExp('Kindly answer all').test(question[0]) && !(new RegExp('Thank you for').test(question[0])))) {
          let answer = await answerToQuestion(request, question, type, [], userInfo);
          await page2.locator('div[data-placeholder="Type message here..."]').fill(answer.answer || 'Skip this question');
          await page2.getByText('Save').last().click();
          await page2.waitForTimeout(1000);
          let newUrl = await page2.url();
          if (newUrl !== job.url) {
            return;
          }
        }

      } else if (case3) {
        let type = 'Single Radio';
        let questionElement = chatBot.locator('.botMsg').nth(j);
        let question = await questionElement.allInnerTexts();
        let options: any = await chatBot.locator('.ssrc__label');
        let allOptions: any = [];
        for (let i = 0; i < await options.count(); i++) {
          allOptions.push({
            optionNumber: i,
            textMessage: await options.nth(i).innerText()
          });
        }
        let answer = await answerToQuestion(request, question, type, allOptions, userInfo);
        if (allOptions.length) {
          let option = allOptions.find((option) => option.textMessage === answer.answer);
          if (option) {
            await chatBot.getByText(answer.answer).last().click();
          } else {
            await chatBot.locator('.ssrc__label').nth(0).click();
          }
        }
        await page2.getByText('Save').last().click();
        await page2.waitForTimeout(1000);
        let newUrl = await page2.url();
        if (newUrl !== job.staticUrl) {
          return;
        }


      } else if (case4) {
        let type = 'Multi Checkbox';
        let questionElement = chatBot.locator('.botMsg').nth(j);
        let question = await questionElement.allInnerTexts();
        let options: any = await chatBot.locator('.mcc__label');
        let allOptions: any = [];
        for (let i = 0; i < await options.count(); i++) {
          allOptions.push({
            optionNumber: i,
            textMessage: await options.nth(i).innerText()
          });
        }
        let answer = await answerToQuestion(request, question, type, allOptions, userInfo)
        if (allOptions.length) {
          let option = allOptions.find((option) => option.textMessage === answer.answer);
          if (option) {
            await chatBot.getByText(answer.answer).last().click();
          } else {
            await chatBot.locator('.mcc__label').nth(0).click();
          }
        }
        await page2.getByText('Save').last().click();

      } else {
      }



    }
  }

}


export async function navigateAndCategorizeJobs(page2, jobData, context, limitCrossed, applyJobs, nowApplyingJobs, URL) {
  await page2.goto(URL);
  await page2.waitForTimeout(9000);
  await page2.waitForLoadState('domcontentloaded');
  if (!await page2.getByText('No results found').isVisible()) {
    await collectAllJobListings(jobData, page2);
  }

  let chunkSize = 40;
  let chunkedArray = chunkArray(jobData, chunkSize);
  const newPage = await context.newPage();
  let appliedJobsCount = 0;
  if (jobData.length) {
    for (let i = 0; i < chunkedArray.length; i++) {
      const jobsChunk = chunkedArray[i];
      for (const job of jobsChunk) {
        try {
          if (limitCrossed && appliedJobsCount < 60) {
            break;
          }
          // Navigate to job URL
          await newPage.goto(job.url);
          await newPage.locator('div').filter({ hasText: /^Job match score$/ }).waitFor({ state: 'visible', timeout: 30000 });
          let url = await newPage.url();
          if (await newPage.getByRole('button', { name: 'Apply on company site' }).isVisible()) {
            applyJobs.push(job);
          } else {
            if (await newPage.getByRole('button', { name: 'Apply' }).isVisible()) {
              await newPage.getByRole('button', { name: 'Apply' }).click();

              await newPage.waitForTimeout(2000);
              limitCrossed = await newPage.locator('.ni-icon-error').isVisible();

              let newUrl = await newPage.url();
              if (url === newUrl) {
                nowApplyingJobs.push(job);
                console.log('Pending Job:', nowApplyingJobs.length);
              } else {
                appliedJobsCount++;
                console.log('Applied Job:', appliedJobsCount);
              }

            }
          }

        } catch (error) {
        }
      }

    }
  }
  return { page2, jobData, context, limitCrossed, applyJobs, nowApplyingJobs };
}

export async function collectJobListings(jobData: any, page2) {


  if (await page2.getByText('No results found').isVisible()) {
    return
  }
  await page2.locator('.srp-jobtuple-wrapper').first().waitFor({ state: 'visible' });
  let allJobs = await page2.locator('.srp-jobtuple-wrapper');
  let totalJobsinPage = await allJobs.count();
  for (let i = 0; i < totalJobsinPage; i++) {
    let job = await page2.locator('.srp-jobtuple-wrapper').nth(i);
    await job.scrollIntoViewIfNeeded();
    let title = "no title";
    if (await job.locator('.title').isVisible()) {
      title = await job.locator('.title').innerText();
    }
    let company = "no company";
    if (await job.locator('.comp-name').isVisible()) {
      company = await job.locator('.comp-name').innerText();
    }
    let location = "no location";
    if (await job.locator('.locWdth').isVisible()) {
      location = await job.locator('.locWdth').innerText();
    }
    let experience = "no experience";
    if (await job.locator('.expwdth').isVisible()) {
      experience = await job.locator('.expwdth').innerText();
    }
    let salary = "no salary";
    if (await job.locator('.sal').isVisible()) {
      salary = await job.locator('.sal').innerText();
    }
    let tags = "no tags";
    if (await job.locator('.tags-gt').isVisible()) {
      tags = await job.locator('.tags-gt').innerText();
    }
    let jobDesc = "no job description";
    if (await job.locator('.job-desc').isVisible()) {
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

    jobData.push(data);

  }
}

export async function collectAllJobListings(jobData, page2) {
  await collectJobListings(jobData, page2);
  if (await page2.getByRole('link', { name: 'Next ' }).isVisible() && jobData.length < 100) {
    await page2.getByRole('link', { name: 'Next ' }).click();
    await page2.waitForNavigation();
    await page2.waitForTimeout(4000);
    await collectAllJobListings(jobData, page2);
  }
}

export function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray: any = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

export function generateEmailContent(jobData: any[]): string {

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
        <td style=" border: 1px solid #ddd; padding: 8px;">${job.experience}</td>
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

export async function answerToQuestion(request, question, type, allOptions, userInfo) {

  let response = await request.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7d0EGHQsCoszAoHAbwcycA4y_Dewm_l8', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      "contents": [
        {
          "parts": [
            {
              "text": `'${userInfo}
              Now answer the following questions:
                          Question ${question}, type
                            ${type}, options
                            ${allOptions}, Answer what to enter here , if you are me, what would you enter here if they give example answer should be same format like like number all input are numbers ?  , create json with  question string and answer string and option answer will be as per allOptions if available,  in required format no need to add explanation  sample format response = {
                              question: 'Are you currently residing in Bengaluru or willing to relocate to Bengaluru?',
                              type: 'Single Radio',
                              allOptions: [
                                { optionNumber: 0, textMessage: 'Yes' },
                                { optionNumber: 1, textMessage: 'No' },
                                { optionNumber: 2, textMessage: 'Skip this question' }
                              ],
                              answer: 'Yes'
                              selectedOption:  0
                              }
                            `
            }
          ]
        }
      ]
    }

  });

  let result = await response.json();
  let jsonData = result.candidates[0].content.parts[0].text ? result.candidates[0].content.parts[0].text : "NA";
  let item = jsonData?.includes('```json')
    ? JSON.parse(jsonData.split('```json')[1].split('```')[0])
    : jsonData;

  let answerInfo = Array.isArray(item) ? item[0] : item;
  return answerInfo;
}

export async function getAllJobs(
  headerDetails: any, name: any, context, mySkills
) {
  let i = 1;
  let pendingJobs = 21
  let jobsArray: any = [];
  let CurrentJobsLength = 21

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
  myHeaders.append("appid", "109");
  myHeaders.append("authorization", `Bearer ${headerDetails.authorization}`);
  myHeaders.append("clientid", "d3skt0p");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("cookie", headerDetails.cookie);
  myHeaders.append("gid", "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE");
  myHeaders.append("nkparam", "==");
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("referer", "https://www.naukri.com/node-jobs?k=node&nignbevent_src=jobsearchDeskGNB");
  myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"Linux\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append("systemid", "Naukri");
  myHeaders.append("user-agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");




  let limitCrossed = false;

  while (CurrentJobsLength !== 0) {
    let url = ''
    let referrer = ''
    if (name === 'ANIL') {
      url = `https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=node%20js%20developer&pageNo=${i}&experience=3&jobAge=7&k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB&experience=3&jobAge=7&seoKey=node-js-developer-jobs&src=directSearch&latLong=`;
      referrer = 'https://www.naukri.com/node-js-developer-jobs?k=node%20js%20developer&nignbevent_src=jobsearchDeskGNB&experience=3&jobAge=7';
    } else if (name === 'SANA') {
      url = `https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_key_loc&searchType=adv&location=hyderabad%20secunderabad&keyword=pl%20sql%20unix%20toad%20oracle%20procedures&pageNo=${i}&sort=p&jobAge=3&wfhType=0&experience=5&k=pl%20sql%20unix%20toad%20oracle%20procedures&l=hyderabad%20secunderabad&nignbevent_src=jobsearchDeskGNB&jobAge=3&wfhType=0&experience=5&seoKey=pl-sql-unix-toad-oracle-procedures-jobs-in-hyderabad-secunderabad-2&src=cluster&latLong=&sid=17371892717901365_8`;
      referrer = 'https://www.naukri.com/angular-developer-jobs?k=angular%20developer&nignbevent_src=jobsearchDeskGNB&experience=3&jobAge=7';
    }
    let response = await fetch(url,
      {
        method: 'GET',
        headers: myHeaders,
        referrer: referrer,
        referrerPolicy: 'strict-origin-when-cross-origin',
        mode: 'cors',
        credentials: 'include'
      });
    // console.log('response', response.jobLis
    try {
      let result = await response.json();

      // noOfJobs = result.noOfJobs
      let jobDetails = result.jobDetails;
      // console.log(jobDetails, "jobDetails")
      if (jobDetails?.length) {
        jobsArray.push(...jobDetails);
        // console.log(result.noOfJobs, "noOfJobs")
        pendingJobs = result.noOfJobs - jobsArray.length;
        CurrentJobsLength = jobDetails.length
      } else {
        CurrentJobsLength = 0
      }
      if (pendingJobs < 0 || jobsArray.length > 250) {
        break;
      }
      // console.log('pendingJobs', pendingJobs, jobsArray.length);
      i++
    } catch (error) {
      console.log('error', error, response, myHeaders);
    }
  }
  console.log('jobsArray', jobsArray.length, pendingJobs < 22);

  let canApplyJobs: any = [];
  for (let i = 0; i < jobsArray.length; i++) {
    const job = jobsArray[i];
    // console.log(job.tagsAndSkills)
    if (job.tagsAndSkills && mySkills.some(skill => job.tagsAndSkills.includes(skill))) {
      canApplyJobs.push(job);
    }
  }
  // for (let job of jobsArray) {
  //   await getDetailJobInfo(job, headerDetails, name)
  // }
  let comanyobs: any = []
  let naukariJobs: any = []

  let chunkSize = 40;
  let chunkedArray = chunkArray(jobsArray, chunkSize);
  const newPage = await context.newPage();

  let appliedJobsCount = 0;
  for (let i = 0; i < chunkedArray.length; i++) {
    const jobsChunk = chunkedArray[i];
    for (const job of jobsChunk) {
      try {
        if (limitCrossed && appliedJobsCount < 60) {
          break;
        }
        // Navigate to job URL
        await newPage.goto(`https://www.naukri.com${job.jdURL}`);
        await newPage.locator('div').filter({ hasText: /^Job match score$/ }).waitFor({ state: 'visible', timeout: 30000 });
        let url = await newPage.url();
        if (await newPage.getByRole('button', { name: 'Apply on company site' }).isVisible()) {
          comanyobs.push(job);
        } else {
          if (await newPage.getByRole('button', { name: 'Apply' }).isVisible()) {
            naukariJobs.push(job)
          }
        }
      } catch (error) {
      }

    }
  }
  console.log('comanyobs', comanyobs.length, naukariJobs.length);
  return naukariJobs





}

let pendingJobsL: any = []



export async function getDetailJobInfo(job, headerDetails: any, name: any) {

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
  myHeaders.append("appid", "121");
  myHeaders.append("authorization", `Bearer ${headerDetails.authorization}`);
  myHeaders.append("clientid", "d3skt0p");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("cookie", headerDetails.cookie);
  myHeaders.append("gid", "LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE");
  myHeaders.append("nkparam", headerDetails.nkparam);
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("referer", `https://www.naukri.com${job.jdURL}`);
  myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"Linux\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append("systemid", "Naukri");
  myHeaders.append("user-agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  let response = await fetch(`https://www.naukri.com/jobapi/v4/job/${job.jobId}?microsite=y`, requestOptions)

  let res: any = await response.json() || {};
  if (res?.jobDetails?.staticUrl) {
    pendingJobsL.push({ jobId: job.jobId, staticUrl: res.jobDetails.staticUrl, tagsAndSkills: job.tagsAndSkills, jdURL: job.jdURL, companyJobURL: res.jobDetails.applyRedirectUrl, isCompanyJob: !!res.jobDetails.applyRedirectUrl, alreadyApplied: !!res.jobDetails.applyDate, logStr: res.jobDetails.logStr });
  }
  return
}



export async function applyForJobIfNotApplied(data, headerDetails) {
  // if (!data?.alreadyApplied && data?.logStr && !data.isCompanyJob) {
  console.log(data.jobId)
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("accept-language", "en-US");
  myHeaders.append("appid", "121");
  myHeaders.append("authorization", `${headerDetails.authorization}`);
  myHeaders.append("cache-control", "max-age=0");
  myHeaders.append("clientid", "d3skt0p");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("nkparam", "==");
  myHeaders.append("cookie", headerDetails.cookie);
  myHeaders.append("origin", "https://www.naukri.com");
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("referer", "https://www.naukri.com/job-listings-application-support-lead-java-e-solutions-it-services-pvt-ltd-hyderabad-2-to-5-years-160125924403?src=jobsearchDesk&sid=17371352391488763&xp=10&px=1");
  myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \";Not A Brand\";v=\"99\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append("systemid", "jobseeker");
  myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36");




  const raw = JSON.stringify({
    "strJobsarr": [
      data.jobId
    ],
    "logstr": "--directSearch-9-F-0-1--1737124530450740-",
    "flowtype": "show",
    "crossdomain": true,
    "jquery": 1,
    "rdxMsgId": "",
    "chatBotSDK": false,
    "mandatory_skills": data.tagsAndSkills,
    "optional_skills": data.tagsAndSkills,
    "applyTypeId": "107",
    "closebtn": "y",
    "applySrc": "inboxDesk--BROADCAST",
    "sid": "sajermj",
    "mid": data.jobId
  });
  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  try {
    let newR = await fetch("https://www.naukri.com/cloudgateway-workflow/workflow-services/apply-workflow/v1/apply", requestOptions);
    let resul = await newR.json();
  } catch (error) {
  }


  // }
}

export async function generateEmailContentWithButtonClickOpenAllJobs(canApplyJobs) {
  let htmlContent = ``
  if (canApplyJobs.length) {
    htmlContent = `

      <button class="apply-all" onclick="openAllJobs()">Apply All</button>
      <script>
        ` +
      function openAllJobs() {
        const urls = [
          canApplyJobs.map(job => job.staticUrl)
        ]
        urls.forEach(url => window.open(url, '_blank'));
      }
      + `
      </script>
      `
  }
  return htmlContent;
}

