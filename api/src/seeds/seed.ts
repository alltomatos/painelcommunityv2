import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Plugin } from '../modules/plugins/entities/plugin.entity';
import { Sale } from '../modules/sales/entities/sale.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'pamarketdb',
  entities: [User, Plugin, Sale],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const pluginRepo = AppDataSource.getRepository(Plugin);
  const saleRepo = AppDataSource.getRepository(Sale);

  // Usuário admin
  const admin = userRepo.create({
    name: 'Admin',
    username: 'admin',
    email: 'admin@crm.com',
    password: 'senha123', // Em produção, use hash!
    role: 'admin',
  });
  await userRepo.save(admin);

  // Plugin exemplo
  const plugin = pluginRepo.create({
    slug: 'plugin-exemplo',
    name: 'Plugin Exemplo',
    version: '1.0.0',
    description: 'Plugin de exemplo para seed',
    author: 'Equipe CRM',
    status: 'active',
  });
  await pluginRepo.save(plugin);

  // Venda exemplo
  const sale = saleRepo.create({
    plugin: plugin.slug,
    buyer: 'cliente@crm.com',
    value: 99.90,
    status: 'pago',
    date: new Date().toISOString().slice(0, 10),
    token: 'token123',
    product: 'Produto Exemplo',
  });
  await saleRepo.save(sale);

  console.log('Seed concluído!');
  await AppDataSource.destroy();
}

seed(); 