import { test, expect, BrowserContext, Page } from '@playwright/test';

const employee = {
    firstName: "Aziz",
    lastName: "Javid"
}

test('should land to PIM page', async ({page}) => {
    await page.goto('pim/viewEmployeeList');
    await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
});

test.describe('add employee', ()=>{

    test('should add a new employee', async ({page}) => {
        await page.goto('pim/viewEmployeeList');
        
        await page.getByRole('button', { name: ' Add' }).click();

        await page.getByPlaceholder('First name').fill(employee.firstName);
        await page.getByPlaceholder('Last name').fill(employee.lastName);
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue(employee.firstName);

        await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue(employee.lastName);

    });
    
})

