import { Formly.ComponentsPage } from './app.po';

describe('formly.components App', () => {
  let page: Formly.ComponentsPage;

  beforeEach(() => {
    page = new Formly.ComponentsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
