import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('PluginsController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;
  let jwt: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Registrar e fazer login para obter JWT
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'admin@crm.com',
        password: 'senha123',
        username: 'admin',
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@crm.com',
        password: 'senha123',
      });

    jwt = loginResponse.body.access_token;
    console.debug('LOGIN RESPONSE', loginResponse.body);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/plugins (POST) deve criar um plugin', async () => {
    const res = await request(app.getHttpServer())
      .post('/plugins')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        slug: 'plugin-teste',
        name: 'Plugin Teste',
        version: '1.0.0',
        description: 'Plugin de teste automatizado',
        author: 'AI',
      })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
    expect(res.body.slug).toBe('plugin-teste');
  });

  it('/plugins (GET) deve listar plugins', async () => {
    const res = await request(app.getHttpServer())
      .get('/plugins')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/plugins/:id (GET) deve buscar plugin por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/plugins/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/plugins/:id (PATCH) deve atualizar plugin', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/plugins/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Plugin Atualizado' })
      .expect(200);
    expect(res.body.name).toBe('Plugin Atualizado');
  });

  it('/plugins/:id (DELETE) deve remover plugin', async () => {
    await request(app.getHttpServer())
      .delete(`/plugins/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/plugins/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});
