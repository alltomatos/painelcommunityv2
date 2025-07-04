import { test, expect, Page } from '@playwright/test';

test('Swagger UI deve carregar e exibir informações da API', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:1986/api');
  // Verifica se o texto customizado está visível no corpo da página
  await expect(page.locator('text=MarketplaceDB API')).toBeVisible();
  await expect(page.locator('text=Documentação da API do MarketplaceDB')).toBeVisible();
  // Verifica se há pelo menos um endpoint documentado
  const opblocks = page.locator('.opblock');
  const count = await opblocks.count();
  expect(count).toBeGreaterThan(0);
}); 