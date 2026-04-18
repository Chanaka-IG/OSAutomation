import { BasePage } from "../Base/BasePage";
import { Logger, expect } from '../../Fixtures/logger.fixtures';
import { Locator, Page } from "playwright-core";

export class MyLeavePage extends BasePage{
    
     constructor(page: Page, logger: Logger) {
         super(page)
     }
}