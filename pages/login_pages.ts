/**
 * LoginPage handles interactions with the login screen.
*/

import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        try {
            await this.page.goto(process.env.BASE_URL + '/');
        } catch (error) {
            console.error('Failed to navigate to login page:', error);
            throw error;
        }
    }

    async fillUsername(username: string) {
        try {
            await this.page.fill('#user-name', username);
        } catch (error) {
            console.error('Failed to fill username:', error);
            throw error;
        }
    }

    async fillPassword(password: string) {
        try {
            await this.page.fill('#password', password);
        } catch (error) {
            console.error('Failed to fill password:', error);
            throw error;
        }
    }

    async clickLogin() {
        try {
            await this.page.click('#login-button');
        } catch (error) {
            console.error('Failed to click login button:', error);
            throw error;
        }
    }

    async login(username: string, password: string) {
        try {
            await this.fillUsername(username);
            await this.fillPassword(password);
            await this.page.click('#login-button');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async expectErrorMessage(message: string) {
        try {
            const errorLocator = this.page.locator('[data-test="error"]');
            await expect(errorLocator).toBeVisible();
            await expect(errorLocator).toHaveText(message);
        } catch (error) {
            console.error('Error message expectation failed:', error);
            throw error;
        }
    }
}
