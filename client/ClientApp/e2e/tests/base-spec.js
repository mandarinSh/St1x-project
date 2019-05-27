describe('angularjs homepage todo list', function() {
  // it('should add a todo', function() {
  //   browser.get('http://localhost:4200/loginpage');
  //   expect(browser.getTitle()).toEqual('ClientApp');
  // });

  it('should login', function() {
    browser.get('http://localhost:4200/loginpage');

    element(by.model('nickname')).sendKeys('man1');
    element(by.model('password')).sendKeys('111111');

    element(by.id('log-in-button')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/dialogpage');
  });
});
