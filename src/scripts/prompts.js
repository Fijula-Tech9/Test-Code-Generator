/**
 * Collection of default prompts for different use cases
 */
export const DEFAULT_PROMPTS = {
  /**
   * Prompt for generating Selenium Java test code ONLY
   * (No page object class at all).
   */
  SELENIUM_JAVA_TEST_ONLY: `
    Given the following DOM structure:
    \`\`\`html
    \${domContent}
    \`\`\`

    We want ONLY a Selenium Java TEST CLASS using TestNG (no page object class).
    Action to perform: \${userAction}
    URL: \${pageUrl}

    Requirements:
    1. Use recommended Selenium locator strategies in priority:
       - The elements found using locators should be either one of these tags only: input, button, select, a, div
       - By.id (only if the id doesn't contain multiple digits like "ext-gen623")
       - By.name
       - By.linkText or partialLinkText for links
       - By.cssSelector (avoid using any attribute containing "genai")
       - By.xpath only if others aren't suitable
    2. Implementation guidelines:
       - Java 8+ features if appropriate
       - Use TestNG for assertions
       - Use explicit waits (ExpectedConditions)
       - Add JavaDoc for methods
       - No new page object class is needed—pretend we already have it.
       - DO NOT show the PageFactory or any page class reference

    3. Code structure:
       - Show only a single test class
       - @BeforeMethod, @Test, and @AfterMethod
       - Use meaningful method names
       - Use properties file for config if you want
       - Provide only the test class code block, no other text

    Example:
    \`\`\`java
    package com.genai.tests;

    import org.openqa.selenium.WebDriver;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.WebDriverWait;
    import org.testng.annotations.*;
    import java.time.Duration;

    public class ComponentTest {
        private WebDriver driver;
        private WebDriverWait wait;

        @BeforeMethod
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
            driver.get("\${pageUrl}");
        }

        @Test
        public void testComponentAction() {
            // Implementation
        }

        @AfterMethod
        public void tearDown() {
            if (driver != null) {
                driver.quit();
            }
        }
    }
    \`\`\`
  `,

  /**
   * Prompt for generating Selenium Java Page class ONLY
   * (No test class).
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Given the following DOM structure:
    \`\`\`html
    \${domContent}
    \`\`\`

    We want ONLY a Selenium Java PAGE OBJECT CLASS for that DOM.

    Requirements:
     - Implementation guidelines:
       - Java 8+ features if appropriate
       - Add JavaDoc for methods & class
       - [MANDATORY] Every method should have proper comments above method signature
       - Do not send any explanation or additional text
       
     - Example:
       \`\`\`java
       package com.salesforce.pages;

       import com.framework.selenium.api.design.Locators;
       import com.framework.testng.api.base.SeleniumBase;
              
       public class ComponentPage extends SeleniumBase {
         
          // Component Methods for every element of the DOM with comments


       }       
      \`\`\`
  `,

  /**
   * Prompt for generating Playwright Java Page class ONLY
   * (No test class).
   */
  PLAYWRIGHT_JAVA_PAGE_ONLY: `
    Given the following DOM structure:
    \`\`\`html
    \${domContent}
    \`\`\`

    We want ONLY a Playwright Java PAGE OBJECT CLASS for that DOM.
    Action to perform: \${userAction}
    URL: \${pageUrl}

    Requirements:
    1. Use recommended Playwright locator strategies in priority:
       - getByRole() for semantic elements
       - getByText() or getByLabel() for text and labels
       - getByTestId() if data-testid attributes exist
       - locator() with CSS/XPath only if others aren't suitable
       - DO NOT USE ID as primary locator

    2. Implementation guidelines:
       - Java 8+ features if appropriate
       - Use Playwright's auto-waiting (no explicit waits)
       - Add JavaDoc for methods & class

    3. Code structure:
       - Single page class
       - [CRITICAL] Do not generate the constructor
       - [MANDATORY] Do not add explicit waits
       - Add comments to every method that you generate
       - Provide only the code block, no other text
       - Add reportStep clearly mentioning which page the action is performed
       - Make sure the output content is adding 3 back slashes \`\`\`java\n before and after the generated code
       - Handle exceptions with try catch and log the error message
       - Use meaningful method names
`,

  /**
   * Prompt for generating Playwright TS Page class ONLY
   * (No test class).
   */
  PLAYWRIGHT_TS_PAGE_ONLY: `
Given the following DOM structure:
\`\`\`html
\${domContent}
\`\`\`

We want ONLY a Playwright Typescript PAGE OBJECT CLASS for that DOM.
Action to perform: \${userAction}
URL: \${pageUrl}

Requirements:
1. Use recommended Playwright locator strategies in priority:
   - getByRole() for semantic elements
   - getByText() or getByLabel() for text and labels
   - getByTestId() if data-testid attributes exist
   - locator() with CSS/XPath only if others aren't suitable
   - DO NOT USE ID as primary locator

2. Implementation guidelines:
   - Use TypeScript best practices
   - Leverage Playwright's auto-waiting (no explicit waits)
   - Add JSDoc for methods & class (equivalent to JavaDoc)

3. Code structure:
   - Single page class
   - [CRITICAL] Do not generate the constructor
   - [MANDATORY] Do not add explicit waits
   - Add comments to every method that you generate
   - Provide only the code block, no other text
   - Add reportStep clearly mentioning which page the action is performed
   - Make sure the output content is adding 3 back slashes \`\`\`typescript\n before and after the generated code
   - Handle exceptions with try catch and log the error message
   - Use meaningful method names

EXAMPLE:
\`\`\`typescript
import { PlaywrightBase } from './playwright-base';

export class LoginPage extends PlaywrightBase {
  // Locator for username field using getByLabel()
  private get usernameField() {
    return this.page.getByLabel('Username');
  }
  
  // Locator for login button using getByRole()
  private get loginButton() {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  /**
   * Enters username into login field
   * @param username - Text to enter in username field
   */
  async enterUsername(username: string): Promise<void> {
    try {
      await this.reportStep('Enter username on Login page');
      await this.usernameField.fill(username);
    } catch (error: any) {
      throw new Error(\`Username entry failed: \${error.message}\`);
    }
  }

  /**
   * Clicks the login button
   */
  async clickLogin(): Promise<void> {
    try {
      await this.reportStep('Click login button on Login page');
      await this.loginButton.click();
    } catch (error: any) {
      throw new Error(\`Login button click failed: \${error.message}\`);
    }
  }
}
\`\`\`
`,

  /**
   * Prompt for generating Playwright JavaScript Page class ONLY
   * (No test class).
   */
  PLAYWRIGHT_JS_PAGE_ONLY: `
Given the following DOM structure:
\`\`\`html
\${domContent}
\`\`\`

We want ONLY a Playwright JavaScript PAGE OBJECT CLASS for that DOM.
Action to perform: \${userAction}
URL: \${pageUrl}

Requirements:
1. Use recommended Playwright locator strategies in priority:
   - getByRole() for semantic elements
   - getByText() or getByLabel() for text and labels
   - getByTestId() if data-testid attributes exist
   - locator() with CSS/XPath only if others aren't suitable
   - DO NOT USE ID as primary locator

2. Implementation guidelines:
   - Use modern JavaScript ES6+ features
   - Leverage Playwright's auto-waiting (no explicit waits)
   - Add JSDoc for methods & class

3. Code structure:
   - Single page class
   - [CRITICAL] Do not generate the constructor
   - [MANDATORY] Do not add explicit waits
   - Add comments to every method that you generate
   - Provide only the code block, no other text
   - Add reportStep clearly mentioning which page the action is performed
   - Make sure the output content is adding 3 back slashes \`\`\`javascript\n before and after the generated code
   - Handle exceptions with try catch and log the error message
   - Use meaningful method names

EXAMPLE:
\`\`\`javascript
const { PlaywrightBase } = require('./playwright-base');

class LoginPage extends PlaywrightBase {
  // Locator for username field using getByLabel()
  get usernameField() {
    return this.page.getByLabel('Username');
  }
  
  // Locator for login button using getByRole()
  get loginButton() {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  /**
   * Enters username into login field
   * @param {string} username - Text to enter in username field
   */
  async enterUsername(username) {
    try {
      await this.reportStep('Enter username on Login page');
      await this.usernameField.fill(username);
    } catch (error) {
      throw new Error(\`Username entry failed: \${error.message}\`);
    }
  }

  /**
   * Clicks the login button
   */
  async clickLogin() {
    try {
      await this.reportStep('Click login button on Login page');
      await this.loginButton.click();
    } catch (error) {
      throw new Error(\`Login button click failed: \${error.message}\`);
    }
  }
}

module.exports = { LoginPage };
\`\`\`
`,

  /**
   * Prompt for generating Cypress JavaScript Page class ONLY
   * (No test class).
   */
  CYPRESS_JS_PAGE_ONLY: `
Given the following DOM structure:
\`\`\`html
\${domContent}
\`\`\`

We want ONLY a Cypress JavaScript PAGE OBJECT CLASS for that DOM.
Action to perform: \${userAction}
URL: \${pageUrl}

Requirements:
1. Use recommended Cypress selector strategies in priority:
   - data-cy attributes for test-specific selectors
   - data-testid attributes
   - Class names that are stable and semantic
   - CSS selectors for reliable element targeting
   - Avoid using IDs that contain generated numbers

2. Implementation guidelines:
   - Use modern JavaScript ES6+ features
   - Leverage Cypress's built-in waiting and retry logic
   - Add JSDoc for methods & class
   - Use Cypress commands (cy.get(), cy.contains(), etc.)

3. Code structure:
   - Single page class
   - [CRITICAL] Do not generate the constructor
   - [MANDATORY] Use Cypress commands, no explicit waits needed
   - Add comments to every method that you generate
   - Provide only the code block, no other text
   - Add cy.log() statements for better test reporting
   - Make sure the output content is adding 3 back slashes \`\`\`javascript\n before and after the generated code
   - Handle exceptions with try catch and log the error message
   - Use meaningful method names

EXAMPLE:
\`\`\`javascript
class LoginPage {
  // Selectors for page elements
  get usernameField() {
    return cy.get('[data-cy="username-input"]').or('input[name="username"]');
  }
  
  get passwordField() {
    return cy.get('[data-cy="password-input"]').or('input[name="password"]');
  }
  
  get loginButton() {
    return cy.get('[data-cy="login-button"]').or('button[type="submit"]');
  }

  /**
   * Enters username into login field
   * @param {string} username - Text to enter in username field
   */
  enterUsername(username) {
    try {
      cy.log('Enter username on Login page');
      this.usernameField.clear().type(username);
    } catch (error) {
      throw new Error(\`Username entry failed: \${error.message}\`);
    }
  }

  /**
   * Enters password into password field
   * @param {string} password - Text to enter in password field
   */
  enterPassword(password) {
    try {
      cy.log('Enter password on Login page');
      this.passwordField.clear().type(password);
    } catch (error) {
      throw new Error(\`Password entry failed: \${error.message}\`);
    }
  }

  /**
   * Clicks the login button
   */
  clickLogin() {
    try {
      cy.log('Click login button on Login page');
      this.loginButton.click();
    } catch (error) {
      throw new Error(\`Login button click failed: \${error.message}\`);
    }
  }

  /**
   * Performs complete login action
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
}

export default LoginPage;
\`\`\`
`,

  /**
   * Prompt for generating Cypress TypeScript Page class ONLY
   * (No test class).
   */
  CYPRESS_TS_PAGE_ONLY: `
Given the following DOM structure:
\`\`\`html
\${domContent}
\`\`\`

We want ONLY a Cypress TypeScript PAGE OBJECT CLASS for that DOM.
Action to perform: \${userAction}
URL: \${pageUrl}

Requirements:
1. Use recommended Cypress selector strategies in priority:
   - data-cy attributes for test-specific selectors
   - data-testid attributes
   - Class names that are stable and semantic
   - CSS selectors for reliable element targeting
   - Avoid using IDs that contain generated numbers

2. Implementation guidelines:
   - Use TypeScript best practices with proper typing
   - Leverage Cypress's built-in waiting and retry logic
   - Add JSDoc for methods & class
   - Use Cypress commands (cy.get(), cy.contains(), etc.)
   - Include proper TypeScript types

3. Code structure:
   - Single page class
   - [CRITICAL] Do not generate the constructor
   - [MANDATORY] Use Cypress commands, no explicit waits needed
   - Add comments to every method that you generate
   - Provide only the code block, no other text
   - Add cy.log() statements for better test reporting
   - Make sure the output content is adding 3 back slashes \`\`\`typescript\n before and after the generated code
   - Handle exceptions with try catch and log the error message
   - Use meaningful method names
   - Include proper return types

EXAMPLE:
\`\`\`typescript
class LoginPage {
  // Selectors for page elements
  get usernameField(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-cy="username-input"]').or('input[name="username"]');
  }
  
  get passwordField(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-cy="password-input"]').or('input[name="password"]');
  }
  
  get loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-cy="login-button"]').or('button[type="submit"]');
  }

  /**
   * Enters username into login field
   * @param username - Text to enter in username field
   */
  enterUsername(username: string): void {
    try {
      cy.log('Enter username on Login page');
      this.usernameField.clear().type(username);
    } catch (error) {
      throw new Error(\`Username entry failed: \${(error as Error).message}\`);
    }
  }

  /**
   * Enters password into password field
   * @param password - Text to enter in password field
   */
  enterPassword(password: string): void {
    try {
      cy.log('Enter password on Login page');
      this.passwordField.clear().type(password);
    } catch (error) {
      throw new Error(\`Password entry failed: \${(error as Error).message}\`);
    }
  }

  /**
   * Clicks the login button
   */
  clickLogin(): void {
    try {
      cy.log('Click login button on Login page');
      this.loginButton.click();
    } catch (error) {
      throw new Error(\`Login button click failed: \${(error as Error).message}\`);
    }
  }

  /**
   * Performs complete login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  login(username: string, password: string): void {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
}

export default LoginPage;
\`\`\`
`,

  CUCUMBER_ONLY: `
  Given the following DOM structure:
  \`\`\`html
  \${domContent}
  \`\`\`

  We want a **Cucumber (Gherkin) .feature file** only.  

  **Instructions**:
  - Output **only** valid Gherkin inside a \`\`\`gherkin\`\`\` block.
  - Do not include any Java or step definition code.
  - Provide only one happy path scenario.

  Example:
  \`\`\`gherkin
  Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username  | password  |
      | "testuser" | "testpass" |
      | "admin"    | "admin123" |
  \`\`\`
`,

  CUCUMBER_WITH_STEPS: `
  Given the following DOM structure:
  \`\`\`html
  \${domContent}
  \`\`\`

  We want:
  1. A **Cucumber .feature file**.
  2. A **Java step definition class** using Cucumber annotations (\`@Given\`, \`@When\`, \`@Then\`).
  3. Do not include any Page Object code.
  **Instructions**:
  - First output valid Gherkin inside a \`\`\`gherkin\`\`\` block.
  - Next, output a Java class with step definitions inside a \`\`\`java\`\`\` block.
  - Use \`io.cucumber.java.en.*\` imports and annotate each method appropriately.
  - Do not include any Page Object code here.

  Example:
  \`\`\`gherkin
  Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username  | password  |
      | "testuser" | "testpass" |
      | "admin"    | "admin123" |
  \`\`\`

  \`\`\`java
  package com.leaftaps.stepdefs;

  import io.cucumber.java.en.*;
  import org.testng.Assert;

  public class LoginStepDefinitions {

      @Given("I open the login page")
      public void i_open_the_login_page() {
          // WebDriver code to navigate to login page
      }

      @When("I type {string} into the Username field")
      public void i_type_into_the_Username_field(String username) {
          // WebDriver code to enter username
      }

      @When("I type {string} into the Password field")
      public void i_type_into_the_Password_field(String password) {
          // WebDriver code to enter password
      }

      @When("I click the Login button")
      public void i_click_the_Login_button() {
          // WebDriver code to click login button
      }

      @Then("I should be logged in successfully")
      public void i_should_be_logged_in_successfully() {
          // Assertion or verification code
          Assert.assertTrue(true);
      }
  }
  \`\`\`
`,
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, "\\`\\`\\`");
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  // Replace all variables in the prompt
  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\\${${k}}`, "g");
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  PLAYWRIGHT_JAVA_PAGE_ONLY: "Playwright-Java-Page-Only",
  PLAYWRIGHT_TS_PAGE_ONLY: "Playwright-Ts-Page-Only",
  PLAYWRIGHT_JS_PAGE_ONLY: "Playwright-Js-Page-Only",
  SELENIUM_JAVA_PAGE_ONLY: "Selenium-Java-Page-Only",
  SELENIUM_JAVA_TEST_ONLY: "Selenium-Java-Test-Only",
  CYPRESS_JS_PAGE_ONLY: "Cypress-Js-Page-Only",
  CYPRESS_TS_PAGE_ONLY: "Cypress-Ts-Page-Only",
  CUCUMBER_ONLY: "Cucumber-Only",
  CUCUMBER_WITH_STEPS: "Cucumber-With-Steps",
};
