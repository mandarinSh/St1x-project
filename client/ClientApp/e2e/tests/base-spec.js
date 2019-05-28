
let LoginPage = require('./loginpage.po');
let DialogPage = require('./dialogpage.po');
let RegisterPage = require('./registerpage.po');

describe('ClientApp ', function() {

  beforeEach(() => {
    loginPage = new LoginPage();
    dialogPage = new DialogPage();
    registerPage = new RegisterPage();
  });

  it('should add a todo', function() {
    loginPage.navigateTo();
    expect(browser.getTitle()).toEqual('ClientApp');
  });

  it('should login', function() {
    let curUrl;

    loginPage.navigateTo();
    loginPage.fillCredentials();

    browser.waitForAngularEnabled(false);

    loginPage.clickLogIn();
    browser.sleep(2000);
    let url;
    browser.getCurrentUrl().then(data => {
      url = data;
      curUrl = data;
      console.log(curUrl);
      expect(data).toEqual('http://localhost:4200/dialogpage');
    });
  });

  it('should sign up', function() {
    let curUrl;

    loginPage.navigateTo();

    browser.waitForAngularEnabled(false);

    loginPage.clickSignUp();
    browser.sleep(2000);
    let url;
    browser.getCurrentUrl().then(data => {
      expect(data).toEqual('http://localhost:4200/registerpage');
    });
  });


  it('should sign up', function() {
    let curUrl;

    loginPage.navigateTo();

    browser.waitForAngularEnabled(false);

    loginPage.clickSignUp();
    browser.sleep(2000);
    browser.getCurrentUrl().then(data => {
      expect(data).toEqual('http://localhost:4200/registerpage');
    });



    browser.sleep(5000);
    registerPage.fillCredentials();
    browser.sleep(5000);

    // browser.waitForAngularEnabled(false);

    loginPage.clickSignUp();
    browser.sleep(10000);
    let url;
    browser.getCurrentUrl().then(data => {
      url = data;
      curUrl = data;
      console.log(curUrl);
      expect(data).toEqual('http://localhost:4200/loginpage');
    });
  });



});
