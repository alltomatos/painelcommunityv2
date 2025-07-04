# 🗺️ ROADMAP GarapaCRM Community - Painel Admin

## ✅ Visão Geral

Criar um **painel administrativo completo** para o ecossistema do GarapaCRM Community com foco em:

- Gestão de plugins (free/premium)
- Integração de pagamentos via Mercado Pago
- Geração de licenças
- Integração com GarapaCRM OSS via API REST
- Aplicação de regras de UI/UX com condensar + contraste

---

## 📅 SPRINTS DO PROJETO

---

### 🟩 Sprint 01 – Validação Estrutura Base + Ajustes UI

**Resumo:** Validar estrutura existente do painel, aplicar padrões de condensar e contraste, garantir que layout, login e setup inicial estejam prontos para os próximos módulos.

- **Objetivos:**
  - Validar estrutura de pastas (frontend/painelcommunity/api)
  - Garantir que autenticação local funcione corretamente
  - Aplicar **design tokens obrigatórios** (`border-2`, `shadow-md`, `gap-condensed`) nos componentes existentes
  - Revisar layout com Sidebar, Header e navegação inicial
  - Adicionar estrutura de rotas (`React Router`)
- **Arquivos afetados:** `src/pages/`, `src/components/`, `src/styles/`, `api/auth/`
- **Critérios de aceite:**
  - Estrutura modular e separação por domínio confirmadas
  - Login funcionando com proteção de rota
  - Todos os componentes com estilos seguindo padrão visual
  - Navegação básica entre páginas implementada
- **Responsividade:** ✅ Mobile-first testado nos componentes principais


---

### 🟦 Sprint 02 – CRUD de Plugins (Marketplace)

**Resumo:** Implementar o módulo de cadastro e listagem de plugins com upload de bundle.

- **Objetivos:**
  - CRUD completo de plugins (listagem, criação, edição, exclusão)
  - Upload de `.zip` ou link externo
  - Visualização detalhada de plugin
- **Arquivos afetados:** `api/plugins/`, `src/pages/plugins/`, `components/plugin-card.tsx`
- **Critérios de aceite:**
  - Plugins com status (ativo/inativo)
  - Campo `slug` único validado
  - Upload de arquivo funcionando
- **Design:** Cards com `border-2`, `gap-condensed`, badges com contraste

---

### 🟨 Sprint 03 – Integração Mercado Pago (Pix Checkout)

**Resumo:** Implementar checkout Pix transparente com SDK Mercado Pago.

- **Objetivos:**
  - Criar endpoint `POST /checkout/pix`
  - Geração de QR Code dinâmico + código copia e cola
  - Expiração de pagamento
  - Retorno dos campos `qr_code`, `copy_and_paste`
- **Arquivos afetados:** `api/payments/`, `lib/mercadopago.ts`, `src/pages/checkout/`
- **Critérios de aceite:**
  - Checkout funcional
  - SDK operando com método `pix`
  - Exibição do QR Code no frontend
- **Extra:** Simulação de fluxo de pagamento

---

### 🟥 Sprint 04 – Webhook + Licenciamento

**Resumo:** Criar a lógica de geração de tokens de licença após pagamento.

- **Objetivos:**
  - Webhook `POST /webhook/mercadopago`
  - Geração de token com validade e HMAC
  - Endpoint `POST /activate` para ativação do plugin
  - Endpoint `GET /plugins` para consulta no GarapaCRM OSS
- **Arquivos afetados:** `api/licenses/`, `api/webhook/`, `lib/token-generator.ts`
- **Critérios de aceite:**
  - Tokens únicos e assinados
  - Ativação validando token e vencimento
  - Consulta pública protegida por CORS

---

### 🟪 Sprint 05 – Integração com GarapaCRM OSS

**Resumo:** Criar endpoints para comunicação entre o CRM open source e o painel.

- **Objetivos:**
  - Permitir ao CRM baixar plugins comprados
  - Validar licenças antes da instalação
  - Implementar CORS + autenticação básica via token
- **Arquivos afetados:** `api/activate.ts`, `api/plugins.ts`
- **Critérios de aceite:**
  - Respostas claras e seguras
  - Plugins filtrados por status de compra
  - Teste com CRM em ambiente local

---

### 🟦 Sprint 06 – UI Refinada + Design Tokens

**Resumo:** Aplicar rigorosamente todas as regras de densidade, contraste e responsividade.

- **Objetivos:**
  - Aplicar condensar (`gap-2`, `space-y-2`)
  - Adicionar `shadow-md`, `border-2` em todos cards
  - Validar versão mobile e dark mode
- **Arquivos afetados:** `src/styles/`, `src/components/ui/`
- **Critérios de aceite:**
  - Responsivo em 3 breakpoints (mobile/tablet/desktop)
  - 0 erros de contraste visual
  - Padrões de badges, cards e tabelas seguidos

---

### 🟦 Sprint 07 – Estabilização Backend e Testes Automatizados

**Resumo:** Garantir estabilidade do backend, corrigir problemas de build, dependências e ambiente, validar funcionamento com testes automatizados e padronizar scripts de inicialização e debug.

- **Objetivos:**
  - Corrigir scripts e configurações do backend
  - Validar ambiente de desenvolvimento e debug
  - Executar e acompanhar testes automatizados (Playwright/Jest)
  - Garantir estrutura modular e ambiente estável
- **Arquivos afetados:** `api/`, `api/package.json`, `api/tsconfig.json`, `api/src/`
- **Critérios de aceite:**
  - Backend rodando em modo desenvolvimento e debug
  - 0 erros TypeScript e ESLint
  - Testes automatizados executados e validados
  - Documentação atualizada
- **Responsividade:** N/A (backend)

---

### 🟨 Sprint 08 – Testes Finais + Deploy

**Resumo:** Testes de ponta-a-ponta, documentação e publicação.

- **Objetivos:**
  - Validação de toda jornada de compra → instalação
  - Documentação da API REST
  - Deploy da API + frontend (VPS ou Vercel + Supabase/PostgreSQL)
- **Critérios de aceite:**
  - Testes com dados reais
  - Logs em todos pontos críticos
  - Manual de uso para o administrador

---

## 🏁 Finalização

- ✅ Checklists aplicados: Condensar + Contraste
- ✅ Responsividade testada: Mobile First
- ✅ Token de licença validado com segurança
- ✅ Versão v1.0.0 publicada
- 📁 Documentação final no `docs/roadmap.md`
