import { test, expect, BrowserContext, Page } from '@playwright/test';
import { Employee } from "../../utils/types";

const employee: Employee = {
    firstName: "Sarah",
    lastName: "Baldini"
}

const updatedEmail = `${employee.firstName} ${employee.lastName}@gmail.com`;

//Run all tests for this file in serial mode as one is dependent on the other
test.describe.configure({ mode: 'serial' });

test('should land to Recruitment page', async ({page}) => {
    await page.goto('recruitment/viewCandidates');
    await expect(page.getByRole('heading', { name: 'Candidates' })).toBeVisible();
});

test.describe('candidate', ()=>{
    test('should add a new candidate', async ({page}) => {
        await page.goto('recruitment/viewCandidates');

        await page.getByRole('button', { name: ' Add' }).click();
        await page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastName);
        await page.locator('form i').first().click();
        await page.getByRole('option', { name: 'Payroll Administrator' }).click();
        await page.getByRole('textbox', { name: 'Type here' }).first().fill(`${employee.firstName}_${employee.lastName}@aol.com`);
        await page.locator('form span i').click();
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('#app')).toContainText('Application Stage');
        const employeeFullName = `${employee.firstName} ${employee.lastName}`;
        await expect(page.locator('#app')).toContainText(employeeFullName);
        await expect(page.locator('#app')).toContainText('Status: Application Initiated');
    });

    test('should update candidate information', async({page})=>{
        await page.goto('recruitment/viewCandidates');
    await page.getByRole('textbox', { name: 'Type for hints...' }).fill(employee.firstName);
    await page.getByRole('option', { name: `${employee.firstName} ${employee.lastName}` }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.locator('label').filter({ hasText: 'Edit' }).locator('span').click();

    await page.getByRole('textbox', { name: 'Type here' }).first().press('ArrowRight');

    await page.getByRole('textbox', { name: 'Type here' }).first().fill(updatedEmail);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('textbox', { name: 'Type here' }).first()).toHaveValue(updatedEmail);
    });

    test('should delete employee', async ({page})=>{
        await page.goto('recruitment/viewCandidates');
        await expect(page.getByText(`${employee.firstName} ${employee.lastName}`)).toBeVisible();
        await page.getByRole('row', { name: ` Payroll Administrator ${employee.firstName} ${employee.lastName} Hux General gabbard 2025-14-03` }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: ' Yes, Delete' }).click();
        await expect(page.getByText(`${employee.firstName} ${employee.lastName}`)).toHaveCount(0);
    });
    
})