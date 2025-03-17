import { test, expect, BrowserContext, Page } from '@playwright/test';

test('should land to Admin page', async ({page}) => {
    await page.goto('admin/viewSystemUsers');
    await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
});


