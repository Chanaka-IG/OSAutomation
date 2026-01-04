export class Modal {
  constructor() {}
  async close(page: any) { await page.click('text=Close'); }
}
