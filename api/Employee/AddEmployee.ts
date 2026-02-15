import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';


export class AddEmployee {
  private apiContext: APIRequestContext;
  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async loginAsAdmin(): Promise<void> {

    const loginPageResponse = await this.apiContext.get(
      `${ENV.baseUrl}/web/index.php/auth/login`
    );

    const html = await loginPageResponse.text();

    const match = html.match(/:token="&quot;([^"]+)&quot;"/);
    if (!match) {
      throw new Error('Token not found');
    }

    const csrfToken = match[1];
//    console.log('Extracted token:', csrfToken);

    const response = await this.apiContext.post(
      `${ENV.baseUrl}/web/index.php/auth/validate`,
      {
        form: {
          username: process.env.ADMIN_USERNAME || 'admin',
          password: process.env.ADMIN_PASSWORD || 'admin@OHRM123',
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

    console.log('Admin login successful (session established)');

  }

  async getEmployees(): Promise<void> {
    const response = await this.apiContext.get(
      `${ENV.baseUrl}/web/index.php/api/v2/pim/employees`,
    );

    // Debug
    const emp = await response.json();
    const body = await response.text();

    console.log('Employee List', body);

    if (!response.ok()) {
      throw new Error(`Login failed`);
    }
  }

  async addEmployees(employees:any): Promise<void> {

  for (const emp of employees){
     const response = await this.apiContext.post(
      `${ENV.baseUrl}/web/index.php/api/v2/pim/employees`,
      {
        data: {
          employeeId: emp.employeeId,
          firstName: emp.firstName,
          lastName: emp.lastName,
          middleName: emp.middleName
        },
      }
    );

    // Debug
    const apiresponse = await response.json();
    const body = await response.text();
    if (response.ok()) {
      console.log (emp.firstName +" "+ emp.middleName +" "+ emp.lastName + " Successfully added with the employee ID : " + emp.employeeId )
    }
    else{
      throw new Error(await response.text());
    }
  }

  }
}