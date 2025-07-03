# 📄 PRD: Painel Administrativo do GarapaCRM Community

## 1. Visão Geral

### 🎯 Objetivo
Criar um painel administrativo centralizado para gerenciar plugins, licenciamento e vendas no ecossistema **GarapaCRM Community**, com integração completa ao Mercado Pago via Pix Transparente.

### 📍 Escopo
- Desenvolvimento de interface administrativa (frontend)
- Criação de API RESTful (backend)
- Integração com PostgreSQL
- Integração com api do Mercado Pago usando sdk
- Geração de tokens de licença para plugins

---

## 2. Público Alvo

- **Administradores**: você e outros admins que irão subir plugins, gerenciar preços e acompanhar vendas.
- **Desenvolvedores/Usuários do GarapaCRM Open Source**: que consumirão plugins via marketplace.

---

## 3. Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
Use Context7 MCP
| Frontend | Vite + TypeScript + Tailwind CSS |
| UI Components | Shadcn UI / Radix UI (opcional) |
| Backend | Node.js + Nest.js |
| Banco de Dados | PostgreSQL |
| Autenticação | JWT (validação local inicialmente) |
| Pagamentos | SDK Mercado Pago |

---

## 4. Funcionalidades Detalhadas

### ✅ 4.1. Login/Admin Restrito

**Descrição:** Acesso restrito a usuários administradores.

#### Requisitos:
- Tela de login com campos: e-mail e senha
- Validação local por enquanto (usuário fixo ou autenticação simples)
- Proteção contra tentativas repetidas (opcional)

---

### ✅ 4.2. Gestão de Plugins

**Descrição:** Gerenciar plugins que serão disponíveis no marketplace do GarapaCRM.

#### Features:
- Listagem de plugins com filtros (gratuito/premium, status)
- Cadastro de novo plugin:
  - Nome
  - Slug (único)
  - Tipo (gratuito ou premium)
  - Upload `.zip` ou URL externa
  - Preço (se premium)
  - Descrição, tags, imagem de capa (opcional)
- Edição e exclusão de plugins
- Visualização detalhada

#### Model de dados (`plugins`):
```sql
id SERIAL PRIMARY KEY,
name VARCHAR(255),
slug VARCHAR(255) UNIQUE,
type ENUM('free', 'premium'),
price DECIMAL(10,2),
description TEXT,
tags JSON,
download_url TEXT,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()


4.3. Integração com Mercado Pago (Pix Transparente)
Descrição: Permitir cobrança de plugins premium via Pix dinâmico.

Fluxo:
Admin no GarapaCRM seleciona plugin premium → abre um Modal QR Code + código "copia e cola"
Sistema gera preferência de pagamento via Pix usando SDK do Mercado Pago
Exibe QR Code + código "copia e cola"
Webhook atualiza status de pagamento automaticamente
Após confirmação, gera token de licença

Endpoints da API:
POST /checkout/pix → Gera qrcode Pix
POST /webhook/mercadopago → Atualiza status do pagamento
Campos retornados:
qr_code_base64
qr_code
copy_and_paste
payment_id, transaction_id, etc.
Model de dados (payments):

id SERIAL PRIMARY KEY,
user_email VARCHAR(255),
plugin_id INTEGER REFERENCES plugins(id),
transaction_id VARCHAR(255),
payment_status VARCHAR(50), -- pending, approved, expired
license_token TEXT,
expires_at TIMESTAMP,
created_at TIMESTAMP DEFAULT NOW()

4.4. Licenciamento
Descrição: Geração e validação de tokens de licença após pagamento.

Features:
Token único assinado com HMAC SHA256
Validade configurável (ex: 365 dias) se 0 infinito
Endpoint público para ativação de plugins no GarapaCRM OSS


Endpoints da API:
POST /activate → Recebe token e valida no backend
GET /plugins → Lista plugins disponíveis + status de compra do usuário

Model de dados (licenses):

id SERIAL PRIMARY KEY,
plugin_id INTEGER REFERENCES plugins(id),
token TEXT UNIQUE,
user_identifier VARCHAR(255), -- e-mail ou instanceId
expires_at TIMESTAMP,
is_valid BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT NOW()

5. Arquitetura Sugerida
Estrutura do Projeto

frontend na raiz e pasta api/ dentro da raiz para o backend


6. APIs Disponíveis

Método,Rota,Descrição
POST,/auth/login,Login do admin
GET,/plugins,Lista todos os plugins
POST,/plugins,Cria novo plugin
PUT,/plugins/:id,Edita plugin
DELETE,/plugins/:id,Remove plugin
POST,/checkout/pix,Gera checkout Pix
POST,/webhook/mercadopago,Atualiza status de pagamento
POST,/activate,Ativa licença de plugin
GET,/plugins,Lista plugins para consumo pelo GarapaCRM OSS

7. Integração com GarapaCRM Open Source
O GarapaCRM se conectará à seguinte API:

GET /plugins → Retorna lista de plugins com status de compra
POST /activate → Envia token para validar licença
O token será usado como chave de ativação dentro do plugin instalado no CRM. 

8. Design & UX/UI
Seguir exatamente o mesmo design system do GarapaCRM
Componentes reutilizáveis (botões, inputs, tabelas, modais)
Responsivo (mobile-first)
Dark mode (se disponível no GarapaCRM)


9. Entregáveis Esperados


Item,Status
Base do projeto frontend com Tailwind,✅
Layout do painel seguindo GarapaCRM,✅
CRUD de plugins,✅
Checkout Pix integrado com Mercado Pago,✅
Webhook de atualização de pagamento,✅
Geração e validação de tokens de licença,✅
API REST funcional com documentação básica,✅
Integração com PostgreSQL,✅

10. Considerações Finais
    Este painel servirá como núcleo central para monetizar plugins no ecossistema GarapaCRM, garantindo controle total sobre conteúdo, licenciamento e receitas. A experiência visual e de uso deve ser consistente com o produto principal para facilitar a curva de aprendizado dos administradores.










