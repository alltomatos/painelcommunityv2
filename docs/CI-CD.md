# 🚀 CI/CD - Painel Community

## 📋 Visão Geral

O Painel Community utiliza GitHub Actions para automatizar o processo de build, testes e deploy no ambiente de teste (Docker Swarm + Traefik).

## 🔄 Fluxo de CI/CD

```
Push para branch test → Build → Testes → Docker Image → Deploy Teste
Push para branch main → Build → Testes → Docker Image → Deploy Produção
```

## 🏗️ Estrutura do Pipeline

### 📁 Arquivos de Configuração

```
.github/
└── workflows/
    └── ci-cd.yml          # Pipeline principal

docker-compose.test.yml    # Configuração Docker Swarm (teste)
docker-compose.prod.yml    # Configuração Docker Swarm (produção)
Dockerfile                 # Build da aplicação
nginx.conf                 # Configuração do servidor web
.dockerignore             # Arquivos ignorados no build

scripts/
└── deploy.sh             # Script de deploy automatizado
```

## 🔧 Configuração do GitHub Actions

### 📋 Secrets Necessários

Configure os seguintes secrets no repositório GitHub:

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `DOCKER_USERNAME` | Usuário do Docker Hub | `alltomatos` |
| `DOCKER_PASSWORD` | Token do Docker Hub | `dckr_pat_...` |
| `SSH_PRIVATE_KEY` | Chave SSH privada | `-----BEGIN OPENSSH PRIVATE KEY-----` |
| `SERVER_HOST` | IP/domínio do servidor | `123.456.789.10` |
| `SERVER_USER` | Usuário SSH | `root` |

### 🔐 Como Configurar Secrets

1. **Docker Hub Token:**
   ```bash
   # Acesse: https://hub.docker.com/settings/security
   # Crie um Access Token
   # Use o token como DOCKER_PASSWORD
   ```

2. **SSH Key:**
   ```bash
   # Gerar chave SSH
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   
   # Adicionar chave pública no servidor
   ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
   
   # Usar chave privada como SSH_PRIVATE_KEY
   cat ~/.ssh/id_rsa
   ```

## 🐳 Configuração Docker

### 📦 Imagens Docker

- **Frontend:** `alltomatos/painel-community:latest`
- **Backend:** `alltomatos/painel-community-api:latest`

### 🔄 Build e Push

```bash
# Build local
docker build -t alltomatos/painel-community:latest .

# Push para Docker Hub
docker push alltomatos/painel-community:latest
```

## 🚀 Deploy

### 🌐 URLs de Deploy

| Ambiente | Frontend | API |
|----------|----------|-----|
| **Teste** | `https://test.painel.alltomatos.app.br` | `https://api-test.painel.alltomatos.app.br` |
| **Produção** | `https://painel.alltomatos.app.br` | `https://api.painel.alltomatos.app.br` |

### 🔧 Deploy Manual

```bash
# Deploy teste
./scripts/deploy.sh test

# Deploy produção
./scripts/deploy.sh prod
```

### 📊 Verificar Deploy

```bash
# Verificar serviços
docker service ls | grep painelcommunity

# Ver logs
docker service logs painelcommunity-test_painelcommunity_frontend

# Health check
curl -f https://test.painel.alltomatos.app.br/health
```

## 🧪 Testes

### 📋 Tipos de Testes

1. **Lint:** Verificação de código
2. **Unit Tests:** Testes unitários
3. **Build:** Compilação da aplicação
4. **Docker Build:** Build da imagem Docker

### 🔍 Executar Testes Localmente

```bash
# Instalar dependências
npm install

# Lint
npm run lint

# Testes
npm test

# Build
npm run build
```

## 🔄 Workflow de Desenvolvimento

### 1️⃣ **Desenvolvimento**
```bash
# Criar branch de feature
git checkout -b feature/nova-funcionalidade

# Desenvolver
npm run dev

# Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### 2️⃣ **Teste**
```bash
# Merge para branch test
git checkout test
git merge feature/nova-funcionalidade
git push origin test

# Deploy automático via GitHub Actions
```

### 3️⃣ **Produção**
```bash
# Merge para branch main
git checkout main
git merge test
git push origin main

# Deploy automático via GitHub Actions
```

## 🚨 Troubleshooting

### ❌ Build Falhou

1. **Verificar logs do GitHub Actions**
2. **Testar localmente:**
   ```bash
   npm ci
   npm run lint
   npm test
   npm run build
   ```

### ❌ Deploy Falhou

1. **Verificar conectividade SSH:**
   ```bash
   ssh user@server "docker info"
   ```

2. **Verificar Docker Swarm:**
   ```bash
   ssh user@server "docker node ls"
   ```

3. **Verificar rede proxy:**
   ```bash
   ssh user@server "docker network ls | grep proxy"
   ```

### ❌ Health Check Falhou

1. **Verificar logs do serviço:**
   ```bash
   docker service logs painelcommunity-test_painelcommunity_frontend
   ```

2. **Verificar configuração Traefik:**
   ```bash
   docker service logs traefik
   ```

3. **Verificar certificados SSL:**
   ```bash
   curl -I https://test.painel.alltomatos.app.br
   ```

## 📊 Monitoramento

### 🔍 Logs

```bash
# Logs do frontend
docker service logs painelcommunity-test_painelcommunity_frontend

# Logs do backend
docker service logs painelcommunity-test_painelcommunity_api

# Logs do Traefik
docker service logs traefik
```

### 📈 Métricas

- **Uptime:** Monitorar via health check
- **Performance:** Logs do nginx
- **Erros:** Logs de aplicação

## 🔒 Segurança

### 🔐 Boas Práticas

1. **Secrets:** Nunca commitar secrets no código
2. **Imagens:** Usar imagens oficiais e atualizadas
3. **Networks:** Isolar serviços em redes específicas
4. **Volumes:** Usar volumes externos para persistência
5. **SSL:** Configurar certificados automáticos via Let's Encrypt

### 🛡️ Configurações de Segurança

```nginx
# Headers de segurança no nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
```

## 📝 Comandos Úteis

### 🐳 Docker Swarm

```bash
# Verificar status do swarm
docker node ls

# Verificar serviços
docker service ls

# Escalar serviço
docker service scale painelcommunity-test_painelcommunity_frontend=2

# Remover stack
docker stack rm painelcommunity-test

# Ver logs em tempo real
docker service logs -f painelcommunity-test_painelcommunity_frontend
```

### 🔧 Manutenção

```bash
# Backup do banco
docker exec postgres pg_dump -U painel_user painelcommunity > backup.sql

# Restaurar backup
docker exec -i postgres psql -U painel_user painelcommunity < backup.sql

# Limpar imagens antigas
docker image prune -f

# Limpar volumes não utilizados
docker volume prune -f
```

---

## 📞 Suporte

Para dúvidas ou problemas:

1. **Verificar logs:** GitHub Actions → Actions → Workflow
2. **Verificar deploy:** Script de deploy com logs detalhados
3. **Documentação:** Este arquivo e README.md
4. **Issues:** Criar issue no GitHub com detalhes do problema 