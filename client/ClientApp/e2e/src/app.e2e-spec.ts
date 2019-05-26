import { AppPage } from './app.po';
import {AppComponent} from '../../src/app/app.component';

describe('workspace-project App', () => {
  let page: AppComponent;

  beforeEach(() => {
    page = new AppComponent();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ClientApp');
  });
});
