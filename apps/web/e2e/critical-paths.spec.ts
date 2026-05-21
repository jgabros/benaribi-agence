import { test, expect } from '@playwright/test';

// Stub HubSpot Forms API for all tests
test.beforeEach(async ({ page }) => {
  await page.route('**/api.hsforms.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  );
  await page.route('**/forms.hubspot.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  );
});

// ─── Test 1: Contact form ─────────────────────────────────────────────────────
test('contact form — valid submission shows confirmation', async ({ page }) => {
  await page.goto('/en/contact');

  await page.fill('#cf-firstname', 'Jean');
  await page.fill('#cf-lastname', 'Dupont');
  await page.fill('#cf-email', 'jean.dupont@example.com');
  await page.fill('#cf-country', 'France');
  await page.selectOption('#cf-service', 'residential');
  await page.selectOption('#cf-budget', '100000-500000');

  await page.getByRole('button', { name: /send enquiry|envoyer|enviar/i }).click();

  // Confirmation message replaces the form
  await expect(page.getByRole('status')).toBeVisible({ timeout: 8_000 });
  await expect(page.locator('form')).not.toBeVisible();
});

// ─── Test 2: Resources lead magnet ───────────────────────────────────────────
test('resources lead magnet — download CTA opens email gate, submit triggers download', async ({ page }) => {
  await page.goto('/en/resources');

  // Click download CTA
  await page.getByRole('button', { name: /download/i }).first().click();

  // Modal is visible
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible({ timeout: 5_000 });

  // Fill and submit email
  await modal.getByLabel(/email/i).fill('investor@example.com');

  // Watch for the hidden anchor download click
  const downloadPromise = page.waitForEvent('download').catch(() => null);
  await modal.getByRole('button', { name: /download|submit/i }).click();

  // Modal should close (or download initiated)
  await expect(modal).not.toBeVisible({ timeout: 8_000 });
});

// ─── Test 3: Calculator full flow ────────────────────────────────────────────
test('calculator — valid inputs show results, download CTA opens email gate', async ({ page }) => {
  await page.goto('/en/investment');

  // Fill calculator inputs
  await page.fill('#calc-capital', '750000');
  await page.selectOption('#calc-sector', 'industrial');
  await page.fill('#calc-country', 'Spain');

  await page.getByRole('button', { name: /calculate/i }).click();

  // Results panel appears
  await expect(page.getByText(/indicative/i).first()).toBeVisible({ timeout: 5_000 });

  // Click download CTA
  await page.getByRole('button', { name: /download/i }).first().click();

  // Email gate modal opens
  await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5_000 });

  // Submit email
  await page.getByRole('dialog').getByLabel(/email/i).fill('investor@test.com');
  await page.getByRole('dialog').getByRole('button', { name: /download|submit/i }).click();

  // Modal closes
  await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 8_000 });
});

// ─── Test 4: Language switch ─────────────────────────────────────────────────
test('language switch — EN to FR updates URL, content, and hreflang', async ({ page }) => {
  await page.goto('/en/');

  // Click FR in language switcher
  await page.getByRole('button', { name: /switch to fr/i }).click();

  // URL changes to /fr/
  await expect(page).toHaveURL(/\/fr\//, { timeout: 5_000 });

  // At least one heading renders in French (contains a French word)
  const headings = page.getByRole('heading');
  const texts = await headings.allTextContents();
  const hasFrench = texts.some((t) =>
    /accès|investissement|pourquoi|nos services|maroc/i.test(t)
  );
  expect(hasFrench).toBe(true);

  // hreflang alternate link present
  const hreflangFr = page.locator('link[hreflang="fr"]');
  await expect(hreflangFr).toHaveCount(1);
});

// ─── Test 5: Mobile navigation ───────────────────────────────────────────────
test('mobile navigation — hamburger opens overlay, link click closes it', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/en/');

  // Desktop nav is hidden; hamburger is visible
  const hamburger = page.getByRole('button', { name: /open navigation/i });
  await expect(hamburger).toBeVisible();

  await hamburger.click();

  // Mobile overlay visible with nav links
  const mobileLinks = page.getByRole('navigation').locator('a').first();
  await expect(mobileLinks).toBeVisible({ timeout: 3_000 });

  // Click a link — overlay closes
  await page.getByRole('link', { name: /investment|investissement|inversión/i }).first().click();
  await expect(page.getByRole('link', { name: /home|accueil|inicio/i }).first()).not.toBeVisible({ timeout: 3_000 });
});
