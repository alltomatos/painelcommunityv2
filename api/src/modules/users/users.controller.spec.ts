import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('UsersController (e2e)', () => {
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
      .send({ name: 'Admin', username: 'admin', email: 'admin@crm.com', password: 'senha123' });
    console.debug('REGISTER RESPONSE', registerRes.body);
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'senha123' });
    console.debug('LOGIN RESPONSE', login.body);
    jwt = login.body.access_token;
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) deve criar um usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Usuário Teste', username: 'usuarioteste', email: 'teste@crm.com', password: 'senha123' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
    expect(res.body.name).toBe('Usuário Teste');
  });

  it('/users (GET) deve listar usuários', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/users/:id (GET) deve buscar usuário por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/users/:id (PATCH) deve atualizar usuário', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/users/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Usuário Atualizado' })
      .expect(200);
    expect(res.body.name).toBe('Usuário Atualizado');
  });

  it('/users/:id (DELETE) deve remover usuário', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/users/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});
