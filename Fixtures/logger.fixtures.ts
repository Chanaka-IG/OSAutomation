import { test as base } from '@playwright/test';

export type LoggerFn = (message: string) => void;

export const test = base.extend<{
  logger: { log: LoggerFn; error: LoggerFn };
}>({
  logger: async ({}, use, testInfo) => {
    const log = (message: string) => {
      console.log(`ℹ️ [${testInfo.title}] ${message}`);
      testInfo.attach('log', {
        body: `${message}\n`,
        contentType: 'text/plain',
      });
    };

    const error = (message: string) => {
      console.error(`❌ [${testInfo.title}] ${message}`);
      testInfo.attach('error', {
        body: `${message}\n`,
        contentType: 'text/plain',
      });
    };

    await use({ log, error });
  },
});

export { expect,request } from '@playwright/test';
