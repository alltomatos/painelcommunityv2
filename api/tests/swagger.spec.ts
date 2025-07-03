import { test, expect } from '@playwright/test';

test('Swagger UI deve carregar e exibir informações da API', async ({ page }) => {
  await page.goto('http://localhost:3000/api');
  // Verifica se o texto customizado está visível no corpo da página
  await expect(page.locator('text=MarketplaceDB API')).toBeVisible();
  await expect(page.locator('text=Documentação da API do MarketplaceDB')).toBeVisible();
  // Verifica se há pelo menos um endpoint documentado
  const opblocks = page.locator('.opblock');
  await expect(opblocks).toHaveCountGreaterThan(0);
});

// Helper matcher para contagem maior que zero
expect.extend({
  async toHaveCountGreaterThan(received, min) {
    const count = await received.count();
    const pass = count > min;
    if (pass) {
      return {
        message: () => `expected ${count} to be greater than ${min}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${count} to be greater than ${min}`,
        pass: false,
      };
    }
  },
}); 