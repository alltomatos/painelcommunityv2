# Sprint 01 - Backend Real: Arquitetura, Boas Práticas e Deploy

**Status:** 🚧 EM ANDAMENTO
**Período:** DD/MM - DD/MM
Revisão: Data - Autor

## 📋 OBJETIVO DA SPRINT
- Definir arquitetura e stack do backend real para o Painel Admin
- Documentar melhores práticas de desenvolvimento, segurança e integração
- Estruturar projeto para fácil deploy em container Docker/Portainer
- Garantir integração limpa com frontend React

## 🏗️ ARQUITETURA RECOMENDADA
- **Linguagem:** TypeScript
- **Framework:** Node.js + NestJS (ou Express.js)
- **Banco de Dados:** PostgreSQL (relacional), Redis (cache/session), MongoDB (opcional)
- **ORM:** TypeORM ou Prisma
- **Autenticação:** JWT (Bearer), OAuth2 (opcional)
- **Validação:** class-validator, Zod ou Joi
- **Documentação:** Swagger/OpenAPI
- **Logs:** Winston ou Pino
- **Testes:** Jest (unitários), Supertest (E2E)
- **CI/CD:** GitHub Actions, GitLab CI
- **Deploy:** Docker, Portainer, VPS

## 📦 ESTRUTURA DE PASTAS SUGERIDA
```
painelcommunity/api/
├── src/
│   ├── modules/
│   │   ├── plugins/
│   │   ├── sales/
│   │   ├── users/
│   │   └── ...
│   ├── common/
│   ├── config/
│   ├── main.ts
│   └── app.module.ts
├── test/
├── prisma/ ou migrations/
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## 🔐 MELHORES PRÁTICAS
- Modularização (cada domínio em um módulo)
- DTOs e validação rigorosa de entrada/saída
- Autenticação e autorização em todos endpoints sensíveis
- Versionamento de API (`/api/v1/`)
- Documentação automática (Swagger)
- Testes unitários e E2E obrigatórios
- Logs estruturados e centralizados
- Variáveis de ambiente seguras (.env)
- Tratamento global de erros
- Paginação e filtros em endpoints de listagem
- CORS configurado para integração frontend

## 🔗 INTEGRAÇÃO COM FRONTEND
- Endpoints RESTful claros e versionados
- Respostas padronizadas (status, mensagem, dados)
- CORS liberado para domínio do frontend
- Autenticação JWT: frontend envia token no header Authorization
- Uploads de arquivos via multipart/form-data

## 🚀 DEPLOY COM DOCKER E PORTAINER
- Criar `Dockerfile` para build do painelcommunity/api
- Criar `docker-compose.yml` para orquestração (painelcommunity/api, banco, redis)
- Expor porta padrão (ex: 3000)
- Usar variáveis de ambiente para configs sensíveis
- Publicar imagem no Portainer para fácil gestão em VPS

### Exemplo Dockerfile:
```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Exemplo docker-compose.yml:
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - db
      - redis
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: painelcommunity
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
  redis:
    image: redis:7
    ports:
      - "6379:6379"
volumes:
  db_data:
```

## ✅ CHECKLIST DE QUALIDADE
- [ ] API documentada no Swagger
- [ ] Testes unitários e E2E cobrindo >80%
- [ ] Deploy automatizado e validado
- [ ] Integração frontend/painelcommunity/api testada
- [ ] Logs e monitoramento ativos

## 🚦 PRÓXIMOS PASSOS
- Iniciar implementação dos módulos principais (plugins, vendas, usuários)
- Garantir integração contínua e deploy automatizado

Consulte docs/roadmap.md para próximos passos. 