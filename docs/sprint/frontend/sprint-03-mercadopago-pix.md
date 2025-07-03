# Sprint 03 - Integração Mercado Pago (Pix Checkout)

**Status:** 🚧 EM ANDAMENTO
**Período:** DD/MM - DD/MM
Revisão: Data - Autor

## 📋 OBJETIVO DA SPRINT
- Implementar checkout Pix transparente com SDK Mercado Pago
- Criar endpoint `POST /checkout/pix` (mock)
- Gerar QR Code dinâmico e código copia e cola
- Simular expiração de pagamento
- Exibir QR Code e código no frontend
- Simular fluxo de pagamento (mock)
- Garantir responsividade, feedbacks e validações
- Documentar a sprint conforme padrão

## 🎯 ARQUIVOS AFETADOS / CRIADOS
- `/src/pages/Checkout.tsx`
- `/src/lib/mercadopago.ts` (mock)
- `/src/components/ui/QrCode.tsx` (opcional)
- `/api/payments/checkout.ts` (mock)
- `/docs/sprint/frontend/sprint-03-mercadopago-pix.md`

## ✅ CRITÉRIOS DE ACEITE
- [ ] Checkout Pix funcional (mock)
- [ ] Geração de QR Code dinâmico e código copia e cola
- [ ] Feedback visual de status (aguardando, pago, expirado)
- [ ] Design condensado, contraste, responsividade e dark mode
- [ ] Código sem erros TypeScript
- [ ] Documentação da sprint criada/atualizada

## ⚙️ ASPECTOS TÉCNICOS
- React + TypeScript + Vite
- shadcn/ui para UI
- Mock de integração Mercado Pago (sem painelcommunity/api real)
- Mobile-first, dark mode, acessibilidade

## 🚀 PRÓXIMOS PASSOS
- Finalizar implementação do checkout Pix
- Evoluir para webhook/licenciamento (Sprint 04)

Consulte docs/roadmap.md para próximos passos. 