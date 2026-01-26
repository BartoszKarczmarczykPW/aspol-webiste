import { test, expect } from '@playwright/test';

test('homepage has title and navigation', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ASPOL/);

  // Check for critical navigation elements
  await expect(page.locator('nav').first()).toBeVisible();
  
  // Check main sections exist
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#events')).toBeVisible();
});

test('blog page loads and displays posts', async ({ page }) => {
  await page.goto('/blog');
  
  // Should have blog heading
  await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
  
  // Should verify there are blog posts loaded
  // This depends on the exact markup, but usually looking for link to a post is good
  const postLinks = page.locator('a[href^="/blog/"]');
  await expect(postLinks.first()).toBeVisible();
});

test('events page loads and displays events', async ({ page }) => {
  await page.goto('/events');
  
  // Should have events heading
  await expect(page.getByRole('heading', { name: /Events|Wydarzenia|Événements/i })).toBeVisible();
  
  // Should verify there are event cards
  const eventCards = page.locator('a[href^="/events/"]');
  await expect(eventCards.first()).toBeVisible();
});
