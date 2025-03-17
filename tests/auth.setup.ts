import { test as setup, expect } from '@playwright/test';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

const username = process.env.APP_USERNAME;
const password = process.env.APP_PASSWORD;

console.log(`username ${username} password: ${password}`);
if (!username) {
  throw new Error(`Missing environment variable: USERNAME`);
}
if (!password) {
  throw new Error(`Missing environment variable: PASSWORD`);
}

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('auth/login');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'LOGIN' }).click()
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});