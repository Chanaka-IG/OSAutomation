import { test as base, expect, request } from '@playwright/test';

/**
 * Function type for logging
 */
export type LoggerFn = (message: string) => void;

/**
 * Logger object type
 */
export type Logger = {
  log: LoggerFn;
  error: LoggerFn;
};

export const test = base.extend<{
  logger: Logger;
}>({
  logger: async ({}, use, testInfo) => {

    const log: LoggerFn = (message: string) => {
      console.log(`ℹ️ [${testInfo.title}] ${message}`);
      testInfo.attach('log', {
        body: `${message}\n`,
        contentType: 'text/plain',
      });
    };

    const error: LoggerFn = (message: string) => {
      console.error(`❌ [${testInfo.title}] ${message}`);
      testInfo.attach('error', {
        body: `${message}\n`,
        contentType: 'text/plain',
      });
    };

    await use({ log, error });
  },
});

export { expect, request };
