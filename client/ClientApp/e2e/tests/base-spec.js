describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://localhost:4200/loginpage');
    expect(browser.getTitle()).toEqual('ClientApp');
  });
});
