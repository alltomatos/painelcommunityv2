import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('SalesController (e2e)', () => {
  let app: INestApplication;
  let jwt: string;
  let createdId: number;

  beforeAll(async () => {
    jest.setTimeout(20000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Cria usuário e faz login para obter JWT
    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Vendedor', username: 'vendedor', email: 'vendedor@crm.com', password: 'senha123' });
    console.debug('REGISTER RESPONSE', registerRes.body);
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'vendedor@crm.com', password: 'senha123' });
    console.debug('LOGIN RESPONSE', login.body);
    jwt = login.body.access_token;
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  it('/sales (POST) deve criar uma venda', async () => {
    const res = await request(app.getHttpServer())
      .post('/sales')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        product: 'Produto Teste',
        value: 99.9,
        userId: 1,
        plugin: 'plugin-teste',
        buyer: 'comprador@crm.com',
        status: 'pago',
        date: '2025-07-03',
        token: 'token123',
      })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
    expect(res.body.product).toBe('Produto Teste');
  });

  it('/sales (GET) deve listar vendas', async () => {
    const res = await request(app.getHttpServer())
      .get('/sales')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/sales/:id (GET) deve buscar venda por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/sales/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/sales/:id (PATCH) deve atualizar venda', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/sales/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ product: 'Produto Atualizado' })
      .expect(200);
    expect(res.body.product).toBe('Produto Atualizado');
  });

  it('/sales/:id (DELETE) deve remover venda', async () => {
    await request(app.getHttpServer())
      .delete(`/sales/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/sales/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});
