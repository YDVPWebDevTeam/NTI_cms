import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('redirects the root to the admin panel', async ({ page }) => {
    await page.goto('/')

    // Headless CMS: the bare domain forwards to /admin (or /admin/login).
    await expect(page).toHaveURL(/\/admin/)
  })
})
