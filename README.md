# 🛠️ Painel Community – Gerenciador de Plugins do GarapaCRM

O **Painel Community** é o backend proprietário do marketplace de plugins do ecossistema GarapaCRM Community. Ele centraliza o catálogo de plugins (gratuitos e pagos), gerencia uploads, pagamentos, ativa/desativa plugins e expõe uma API para o marketplace do GarapaCRM consumir, baixar e comprar plugins.

---

## 📦 Funcionalidades Principais
- Catálogo centralizado de plugins (gratuitos e pagos)
- Upload, download, ativação e desativação de plugins
- Integração com Mercado Pago (checkout, liberação pós-pagamento)
- API RESTful para integração com o marketplace do GarapaCRM
- Gerenciamento de permissões (admin, usuário comum)

---

## 🏗️ Arquitetura
- **Backend:** NestJS + TypeORM + PostgreSQL
- **API:** RESTful, JWT Auth, CORS habilitado
- **Deploy:** Docker, Docker Compose, Docker Swarm
- **CI/CD:** GitHub Actions (build, test, push Docker, deploy automático)

---

## 🚀 Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` (baseie-se em `.env.example`).
3. Suba o banco de dados (Postgres) localmente ou via Docker.
4. Rode a aplicação:
   ```bash
   npm run start:dev
   ```
5. Acesse a API em `http://localhost:1953`

---

## 🐳 Como rodar com Docker

1. Ajuste o arquivo `.env` conforme necessário.
2. Build e up com Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Acesse a API em `http://localhost:1953`

---

## 🚢 Deploy com Docker Swarm

1. Faça build e push da imagem Docker para o Docker Hub.
2. Na VPS, execute:
   ```bash
   docker stack deploy -c docker-compose.yml painelcommunity
   ```
3. Acompanhe os logs e healthchecks dos serviços.

---

## 🔄 CI/CD (GitHub Actions)
- Build, lint, testes unitários e E2E automáticos
- Build e push da imagem Docker para o Docker Hub
- Deploy automático na VPS via SSH e Docker Swarm
- Configure os secrets no repositório para acesso seguro

---

## 📚 Documentação
- Documentação da API: `painelcommunity/api/docs`
- Documentação geral do Painel Community: `painelcommunity/docs`
- Guia de integração do ecossistema: `../ecossistema_garapa/guia-integracao-ecossistema.md`

---

## 🏷️ Licença
Este projeto faz parte do ecossistema GarapaCRM. O Painel Community é proprietário, enquanto o GarapaCRM Community é open source.

## Instrução Importante para Backend

> Sempre execute o comando abaixo **dentro da pasta**:
>
> **D:\projetos\crm\painelcommunity\api**
>
> ```sh
> npm run start:dev
> ```
>
> Nunca execute este comando na raiz do projeto ou em outro diretório.

## Outras instruções e informações do projeto

## Health Check Sidebar

O sidebar exibe o status dos principais serviços (API, Redis, RabbitMQ) em tempo real, refletindo a realidade do backend.

### Como funciona
- O frontend utiliza o hook `useApiStatus` para consultar periodicamente os endpoints:
  - `${VITE_API_URL}/health`
  - `${VITE_API_URL}/health/redis`
  - `${VITE_API_URL}/health/rabbitmq`
- O endereço base é definido pela variável de ambiente `VITE_API_URL` no arquivo `.env` do frontend.
- O status "Online"/"Offline" é exibido conforme a resposta real do backend.

### Exemplo de configuração do .env
```env
VITE_API_URL=http://localhost:1986/api
```

### Exemplo de endpoints
- `GET /api/health` → status da API e serviços
- `GET /api/health/redis` → status do Redis
- `GET /api/health/rabbitmq` → status do RabbitMQ

### Observações
- Não deve haver duplicidade de `/api` nas URLs.
- O backend deve estar rodando e expor corretamente os endpoints acima.
- O campo `download_url` dos plugins agora sempre retorna uma URL completa, baseada no endereço do backend.

---

## Atualizações recentes
- Correção do health check para usar o endereço do `.env`.
- Padronização do campo `download_url` dos plugins.
- Sidebar reflete status real dos serviços.

---

## Como contribuir
1. Faça fork do repositório.
2. Crie uma branch para sua feature/correção.
3. Envie um Pull Request com a descrição detalhada.

---

## Dúvidas
Abra uma issue ou entre em contato com o time GarapaCRM.
