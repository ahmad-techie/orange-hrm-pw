import { test, expect } from '@playwright/test';

test.describe('login page', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('auth/login');
  });

  test('should navigate to the login page when entering the correct url', async ({ page }) => {
    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should fail with invalid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('invalid_user');
    await page.getByPlaceholder('Password').fill('InvalidPass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should fail with empty username and password fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText('Required').nth(1)).toBeVisible();
  });

  test('should have a forget password link', async ({ page }) => {
    await page.getByText('Forgot your password?').click();
    await page.waitForLoadState();
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  });
});
