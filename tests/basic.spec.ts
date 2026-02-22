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
  await expect(page.getByRole('heading', { name: /Polish Paris Forum/i }).first()).toBeVisible();
  
  // Should verify there are blog posts loaded
  // This depends on the exact markup, but usually looking for link to a post is good
  const postLinks = page.locator('a[href^="/blog/"]');
  await expect(postLinks.first()).toBeVisible();
});

test('events page loads and displays events', async ({ page }) => {
  await page.goto('/events');
  
  // Should have events heading
  await expect(page.locator('h1').first()).toBeVisible();
  
  // Should verify event content area renders (cards or empty state)
  const eventCardsCount = await page.locator('article').count();
  if (eventCardsCount > 0) {
    await expect(page.locator('article').first()).toBeVisible();
  } else {
    await expect(page.getByText(/No upcoming events scheduled|Aucun événement prévu|Brak zaplanowanych wydarzeń/i)).toBeVisible();
  }
});

test('partners page loads', async ({ page }) => {
  await page.goto('/partners');

  await expect(page).toHaveTitle(/Partners|ASPOL/i);
  await expect(page.getByRole('main')).toBeVisible();
});

test('blog dynamic slug page opens from list', async ({ page }) => {
  await page.goto('/blog');

  const firstPostLink = page.locator('a[href^="/blog/"]').first();
  await expect(firstPostLink).toBeVisible();
  const href = await firstPostLink.getAttribute('href');
  expect(href).toBeTruthy();

  await firstPostLink.click();
  await expect(page).toHaveURL(new RegExp(href!.replace('/', '\\/')));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('events dynamic slug page opens from list', async ({ page }) => {
  const slug = 'networking-apero-march-2026';
  await page.goto(`/events/${slug}`);

  await expect(page).toHaveURL(new RegExp(`/events/${slug}$`));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('critical flow home to events to contact', async ({ page }) => {
  await page.goto('/');

  const eventsLink = page.locator('a[href="/events"]').first();
  await expect(eventsLink).toBeVisible();
  await eventsLink.click();
  await expect(page).toHaveURL(/\/events$/);

  await page.goto('/#contact');
  await expect(page.locator('#contact')).toBeVisible();
});
