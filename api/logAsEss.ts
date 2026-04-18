import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../config/env';


export class LogAsESS {
    private apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async loginAsESS(userName: string, password: string): Promise<void> {

        const loginPageResponse = await this.apiContext.get(
            `${ENV.baseUrl}/web/index.php/auth/login`
        );

        const html = await loginPageResponse.text();

        const match = html.match(/:token="&quot;([^"]+)&quot;"/);
        if (!match) {
            throw new Error('Token not found');
        }

        const csrfToken = match[1];

        const response = await this.apiContext.post(
            `${ENV.baseUrl}/web/index.php/auth/validate`,
            {
                form: {
                    username: userName,
                    password: password,
                    _token: csrfToken
                },
            }
        );

        // Debug
        const status = response.status();
        const body = await response.text();

        console.log('Login status:', status);

        if (!response.ok()) {
            throw new Error(`Login failed: ${status}\n${body}`);
        }

        // OrangeHRM login returns HTML, not JSON
        if (body.includes('Invalid credentials')) {
            throw new Error('Invalid username or password');
        }

        console.log('ESS login successful (session established)');

    }

}