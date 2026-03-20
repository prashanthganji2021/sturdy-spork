import { TIMEOUTS, SELECTORS, API_ENDPOINTS, LIMITS } from './constants';
import type { Job, UserInfo, ApplicationContext } from './types';

export class NaukriManager {
  private readonly ctx: ApplicationContext;

  constructor(context: ApplicationContext) {
    this.ctx = context;
  }

  public async applyForJob(job: Job): Promise<boolean> {
    try {
      await this.navigateToJobPage(job);
      if (await this.isAlreadyApplied()) return false;

      await this.initiateApplication();
      return this.handleChatbotFlow(job);
    } catch (error) {
      console.error(`Job application failed for ${job.jobId}:`, error);
      return false;
    }
  }

  private async navigateToJobPage(job: Job): Promise<void> {
    await this.ctx.page.bringToFront();
    await this.ctx.page.goto(job.staticUrl);
    await this.ctx.page.waitForTimeout(TIMEOUTS.NAVIGATION);
    await this.ctx.page.locator(SELECTORS.JOB_MATCH_SCORE).waitFor({
      state: 'visible',
      timeout: TIMEOUTS.VISIBILITY,
    });
  }

  private async isAlreadyApplied(): Promise<boolean> {
    return this.ctx.page.locator(SELECTORS.APPLIED).isVisible();
  }

  private async initiateApplication(): Promise<void> {
    await this.ctx.page.locator(SELECTORS.APPLY_BUTTON).click();
    await this.ctx.page.waitForTimeout(TIMEOUTS.NAVIGATION);
  }

  private async handleChatbotFlow(job: Job): Promise<boolean> {
    const chatbot = new ChatbotHandler(this.ctx);

    while (await chatbot.isVisible()) {
      const navigated = await chatbot.processCurrentStep(job);
      if (navigated) return true;
    }
    return false;
  }
}

class ChatbotHandler {
  private readonly chatbotLocator;

  constructor(private readonly ctx: ApplicationContext) {
    this.chatbotLocator = this.ctx.page.locator(SELECTORS.CHATBOT);
  }

  public async isVisible(): Promise<boolean> {
    return this.chatbotLocator.isVisible();
  }

  public async processCurrentStep(job: Job): Promise<boolean> {
    const caseType = await this.detectCaseType();

    switch (caseType) {
      case 'ACCEPTANCE':
        await this.handleAcceptance();
        break;
      case 'INPUT':
        await this.handleTextInput();
        break;
      case 'RADIO':
        await this.handleOptionSelection('radio');
        break;
      case 'CHECKBOX':
        await this.handleOptionSelection('checkbox');
        break;
    }

    await this.saveAndVerifyNavigation(job);
    return this.hasNavigatedAway(job.staticUrl);
  }

  private async detectCaseType(): Promise<string> {
    const [isAccept, isInput, isRadio, isCheckbox] = await Promise.all([
      this.chatbotLocator.getByText('I Accept').isVisible(),
      this.ctx.page.locator(SELECTORS.INPUT_FIELD).isVisible(),
      this.chatbotLocator.locator('.ssrc__radio-btn-container').first().isVisible(),
      this.chatbotLocator.locator('.multicheckboxes-container').first().isVisible(),
    ]);

    return isAccept ? 'ACCEPTANCE' :
           isInput ? 'INPUT' :
           isRadio ? 'RADIO' :
           isCheckbox ? 'CHECKBOX' : 'UNKNOWN';
  }

  private async handleAcceptance(): Promise<void> {
    await this.chatbotLocator.getByText('I Accept').click();
  }

  private async handleTextInput(): Promise<void> {
    const question = await this.getCurrentQuestion();
    const answer = await this.generateAnswer(question, 'input');
    await this.ctx.page.locator(SELECTORS.INPUT_FIELD).fill(answer);
  }

  private async handleOptionSelection(type: 'radio' | 'checkbox'): Promise<void> {
    const question = await this.getCurrentQuestion();
    const options = await this.extractOptions(type);
    const answer = await this.generateAnswer(question, type, options);
    await this.selectOption(answer, type);
  }

  private async getCurrentQuestion(): Promise<string> {
    return this.chatbotLocator.locator('.botMsg').first().innerText();
  }

  private async extractOptions(type: string): Promise<Array<{textMessage: string}>> {
    const selector = type === 'radio' ? '.ssrc__label' : '.mcc__label';
    const options = await this.chatbotLocator.locator(selector).all();

    return Promise.all(options.map(async opt => ({
      textMessage: await opt.innerText(),
    })));
  }

  private async generateAnswer(
    question: string,
    type: string,
    options?: Array<{textMessage: string}>
  ): Promise<string> {
    const response = await this.ctx.request.post(
      `${API_ENDPOINTS.GEMINI}?key=AIzaSyB7d0EGHQsCoszAoHAbwcycA4y_Dewm_l8`,
      {
        data: {
          contents: [{
            parts: [{ text: this.buildPrompt(question, type, options) }]
          }]
        }
      }
    );

    return this.parseGeminiResponse(await response.json());
  }

  private buildPrompt(question: string, type: string, options?: any[]): string {
    return `User profile: ${JSON.stringify(this.ctx.userInfo)}
            Question: ${question}
            Type: ${type}
            Options: ${options?.map(o => o.textMessage).join(', ') || 'none'}
            Provide concise answer in required format:`;
  }

  private parseGeminiResponse(response: any): string {
    try {
      const jsonStr = response.candidates[0].content.parts[0].text;
      return JSON.parse(jsonStr.split('```json')[1].split('```')[0]).answer;
    } catch {
      return 'Skip this question';
    }
  }

  private async selectOption(answer: string, type: string): Promise<void> {
    const selector = type === 'radio' ? '.ssrc__label' : '.mcc__label';
    await this.chatbotLocator.locator(`${selector}:has-text("${answer}")`).last().click();
  }

  private async saveAndVerifyNavigation(job: Job): Promise<void> {
    await this.ctx.page.locator(SELECTORS.SAVE_BUTTON).click();
    await this.ctx.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  private async hasNavigatedAway(originalUrl: string): Promise<boolean> {
    return (await this.ctx.page.url()) !== originalUrl;
  }
}

// Helper functions
export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const generateEmailContent = (jobs: Job[]): string => {
  const timestamp = new Date().toLocaleDateString();
  const rows = jobs.map(job => `
    <tr>
      <td>${job.title}</td>
      <td>${job.company}</td>
      <td>${job.location}</td>
      <td><a href="${job.url}" target="_blank">View Job</a></td>
    </tr>
  `).join('');

  return `
    <html>
      <body>
        <h2>Job Listings (${timestamp})</h2>
        <table>
          <thead>
            <tr><th>Title</th><th>Company</th><th>Location</th><th>Link</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;
};

