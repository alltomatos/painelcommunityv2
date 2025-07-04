# Painel Community API (NestJS)

Backend do Painel Community, desenvolvido em NestJS + TypeORM + PostgreSQL.

## 🚀 Como rodar localmente

```bash
cd painelcommunity/api
npm install
npm run start:dev
```

A API estará disponível em http://localhost:1953

## 🐳 Docker

```bash
docker-compose up --build
```

## 🛠️ Scripts principais
- `npm run start:dev` — inicia em modo desenvolvimento
- `npm run build` — builda o projeto
- `npm run test` — executa os testes

## 📦 Estrutura
- `src/` — código-fonte
- `test/` — testes E2E
- `migrations/` — migrations do banco

## 📄 .env.example
Veja o arquivo `.env.example` para variáveis de ambiente necessárias.

---

Documentação e dúvidas: consulte a pasta `/docs` do projeto. 