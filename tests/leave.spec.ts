import { test, expect, BrowserContext, Page } from '@playwright/test';

test('should land to Leave page', async ({page}) => {
    await page.goto('leave/viewLeaveList');
    await expect(page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
});

test.describe('assign leave', ()=>{

    test.skip('should display error message for employees whith no acrued leave', async ({page}) => {
        await page.goto('leave/viewLeaveList');

    });
    
})

