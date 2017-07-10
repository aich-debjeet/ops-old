import { OPSPage } from './app.po';

describe('ops App', () => {
  let page: OPSPage;

  beforeEach(() => {
    page = new OPSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
