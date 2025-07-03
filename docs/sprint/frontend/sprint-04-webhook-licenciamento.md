# Sprint 04 - Webhook + Licenciamento

**Status:** 🚧 EM ANDAMENTO
**Período:** DD/MM - DD/MM
Revisão: Data - Autor

## 📋 OBJETIVO DA SPRINT
- Implementar lógica de geração de tokens de licença após pagamento (mock)
- Criar webhook `POST /webhook/mercadopago` (mock)
- Gerar token de licença com validade e HMAC (mock)
- Endpoint de ativação de plugin `POST /activate` (mock)
- Endpoint de consulta pública de plugins `GET /plugins` (mock)
- Garantir feedbacks, validações, responsividade, documentação

## 🎯 ARQUIVOS AFETADOS / CRIADOS
- `/api/webhook/mercadopago.ts` (mock)
- `/api/licenses/activate.ts` (mock)
- `/src/lib/license.ts` (mock)
- `/src/pages/Activate.tsx`
- `/docs/sprint/frontend/sprint-04-webhook-licenciamento.md`

## ✅ CRITÉRIOS DE ACEITE
- [ ] Webhook mock funcional
- [ ] Geração de token de licença válido (mock, HMAC)
- [ ] Endpoint de ativação de plugin funcional (mock)
- [ ] Consulta pública de plugins protegida por CORS (mock)
- [ ] Feedback visual, responsividade, dark mode
- [ ] Código sem erros TypeScript
- [ ] Documentação da sprint criada/atualizada

## ⚙️ ASPECTOS TÉCNICOS
- React + TypeScript + Vite
- shadcn/ui para UI
- Mock de painelcommunity/api (sem integração real)
- Mobile-first, dark mode, acessibilidade

## 🚀 PRÓXIMOS PASSOS
- Finalizar implementação do licenciamento
- Evoluir para integração CRM OSS (Sprint 05)

Consulte docs/roadmap.md para próximos passos. 