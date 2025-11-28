/**
 * RegistrationPage class representing the user registration page.
*/

import { Page } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        try {
            await this.page.goto(process.env.BASE_URL + '/register.html');
        } catch (error) {
            console.error('Failed to navigate to registration page:', error);
            throw error;
        }
    }

    async register(username: string, password: string) {
        try {
            await this.page.fill('#username', username);
            await this.page.fill('#password', password);
            await this.page.click('#register-button');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }
}
