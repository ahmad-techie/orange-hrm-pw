import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('login page', async () => {

    test('should land to dashboard page after login', async ({page}) => {
        await page.goto('dashboard/index');
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    test('should containt employee distribution by location section', async ({page})=>{
        await page.goto('dashboard/index');
        await expect(page.getByText('Employee Distribution by Location')).toBeVisible();
    })

});
