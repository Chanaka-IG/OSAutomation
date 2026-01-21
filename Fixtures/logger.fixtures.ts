import { test as base } from '@playwright/test';

type Logger = {
  log: (message: string) => void;
}

export const test = base.extend<{ logger: Logger }>({
  logger: async ({}, use, testInfo) => {
    await use({
      log: (message: string) => {
        testInfo.attach('log', {
          body: message + '\n',
          contentType: 'text/plain',
        });
      },
    });
  },
});

export { expect,request } from '@playwright/test';