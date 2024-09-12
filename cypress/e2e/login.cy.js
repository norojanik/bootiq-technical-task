describe("OrangeHRM Login Automation", () => {

  const adminName = Cypress.env('username')
  const password = Cypress.env('password')

  beforeEach(() => {
    cy.visit("/");
  });

  it("Successful login with valid credentials", () => {
    // Enter username
    cy.get('input[name="username"]').type(adminName);

    // Enter password
    cy.get('input[name="password"]').type(password);

    // Click the login button
    cy.get("button[type=Submit]").click();

    // Verify that the user is redirected to the dashboard and layout is visible
    cy.url().should("contain", "/web/index.php/dashboard/index");
    cy.get(".oxd-layout-context").should("be.visible");
  });

  it("Unsuccessful login with invalid password", () => {
    // Enter username
    cy.get('input[name="username"]').type(adminName);

    // Enter password
    cy.get('input[name="password"]').type(randomString());

    // Click the login button
    cy.get("button[type=Submit]").click();

    //  Assert that error message is displayed: "Invalid credentials
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("Unsuccessful login with invalid UserName", () => {
    // Enter username
    cy.get('input[name="username"]').type(randomString());

    // Enter password
    cy.get('input[name="password"]').type(password);

    // Click the login button
    cy.get("button[type=Submit]").click();

    //  Assert that error message is displayed: "Invalid credentials
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("Unsuccessful login with Empty Fields", () => {
    // Click the login button
    cy.get("button[type=Submit]").click();

    //  Assert that error message "Required" is displyed
    cy.get("span.oxd-input-field-error-message")
      .should("have.length", 2)
      .and("be.visible");
  });

  it("Unsuccessful login with only username filled", () => {
    // Enter username
    cy.get('input[name="username"]').type(adminName);

    // Click the login button
    cy.get("button[type=Submit]").click();

    //  Assert that error message "Required" is displyed
    cy.get("span.oxd-input-field-error-message")
      .should("have.length", 1)
      .and("be.visible");
  });

  it("Unsuccessful login with only password filled", () => {
    // Enter password
    cy.get('input[name="password"]').type(password);

    // Click the login button
    cy.get("button[type=Submit]").click();

    //  Assert that error message "Required" is displyed
    cy.get("span.oxd-input-field-error-message")
      .should("have.length", 1)
      .and("be.visible");
  });

  it("Verify 'Forgot Your Password?' link and page", () => {
    //Assert forgot you password and navigate to that page
    cy.get("p.orangehrm-login-forgot-header")
      .should("have.text", "Forgot your password? ")
      .click();
    cy.url().should("contain", "web/index.php/auth/requestPasswordResetCode");

    //Assert elements on password reset page
    cy.get("form.oxd-form")
      .should("be.visible")
      .and("contain", "Reset Password");
    cy.get("input.oxd-input--active").should("have.attr", "name", "username");
    cy.contains("Cancel").should("have.attr", "type", "button");
    cy.get("button.orangehrm-forgot-password-button--reset")
      .should("contain", "Reset Password")
      .and("have.attr", "type", "submit");
  });
});

const randomString = function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}