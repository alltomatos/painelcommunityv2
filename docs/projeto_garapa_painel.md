Estou criando o **painel administrativo do GarapaCRM Community**, hospedado em `community.garapacrm.com`. Ele será usado para gerenciar:

- Plugins gratuitos e pagos
- Licenças de usuários
- Vendas de plugins premium

🎯 FUNCIONALIDADES DO PAINEL ADMIN

✅ 1. **Login/Admin Restrito**
- Autenticação de administrador com validação local por enquanto.

✅ 2. **Gestão de Plugins**
- Listar plugins já cadastrados (nome, descrição, status: gratuito ou premium).
- Criar novo plugin:
  - Ativado/Desativado/
  - Nome
  - Slug (único)
  - Tipo: gratuito ou premium
  - Upload do bundle `.zip` 
  - Preço (caso premium)
  - Descrição, tags.

  os plugin que estiverem ativos irao aparecer no marketplace do GarapaCRM 

✅ 3. **Integração com Mercado Pago (Pix Checkout Transparente)**
- Criar um endpoint na API que gere um **checkout transparente Pix** com:
  - QR Code dinâmico
  - Código "copia e cola"
  - Expiração configurável
- O painel deve armazenar:
  - ID da transação
  - ID do comprador (e-mail, domínio ou instanceId)
  - Plugin comprado
  - Status da compra (aguardando, pago, expirado)
- Usar webhook do Mercado Pago para atualização automática do status de pagamento.

✅ 4. **Licenciamento**
- Após o pagamento confirmado, gerar um token de licença com validade + assinatura.
- O token será consumido pelo CRM open-source (GarapaCRM) para liberar o plugin.
- Endpoint da API:
  - `POST /activate` → ativa licença e libera o plugin
  - `GET /plugins` → lista plugins disponíveis no marketplace com status (grátis ou comprado)

---

💰 DETALHES DO CHECKOUT TRANSPARENTE COM MERCADO PAGO

- Usar SDK oficial do Mercado Pago (já disponível via: Use Context7 MCP )
- Integração deve criar preferências com método exclusivo `payment_methods: pix`
- Retornar os campos:
  - `qr_code_base64`
  - `qr_code`
  - `copy_and_paste`

Webhook: `POST /webhook/mercadopago` deve validar e atualizar a licença quando o pagamento for aprovado.

---

🛠️ O QUE PRECISO QUE VOCÊ CRIE:


2. O painel admin com as funcionalidades acima
3. A API painelcommunity/api com endpoints REST para:
   - Gestão de plugins
   - Integração com Mercado Pago
   - Ativação e consulta de licenças
4. Integração com banco de dados (PostgreSQL)


📌 Obs:
- Este painel será usado por mim (admin) para subir plugins e acompanhar vendas.
- O CRM open-source (GarapaCRM) vai se conectar nesta API para baixar, instalar e ativar plugins dinamicamente.

os plugins so podem ser baixados pelo marketplace

