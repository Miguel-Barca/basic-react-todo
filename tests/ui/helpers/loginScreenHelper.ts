import { test as base, Page } from '@playwright/test';
import { UserCredentials } from './types';

export const test = base.extend<UserCredentials>({
  username: process.env.DEFAULT_USERNAME,
  password: process.env.DEFAULT_PASSWORD,
});

export async function enterCredentials(
  page: Page,
  username: string = process.env.DEFAULT_USERNAME || 'test',
  password: string = process.env.DEFAULT_PASSWORD || 'test'
) {
  await test.step(
    'enter credentials',
    async () => {
      await page
        .getByRole('textbox', { name: 'Enter your username' })
        .fill(username);
      await page
        .getByRole('textbox', { name: 'Enter your password' })
        .fill(password);
      await page.getByRole('button', { name: 'Sign in' }).click();
    },
    { box: true }
  );
}
