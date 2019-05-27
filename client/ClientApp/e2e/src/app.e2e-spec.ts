import * as puppeteer from 'puppeteer';

describe('workspace-project App', () => {
  it('Test Puppeteer screenshot', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  });
});


// import { AppPage } from './app.po';
// import {AppComponent} from '../../src/app/app.component';
//
// describe('workspace-project App', () => {
//   let page: AppComponent;
//
//   beforeEach(() => {
//     page = new AppComponent();
//   });
//
//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getTitleText()).toEqual('ClientApp');
//   });
// });
