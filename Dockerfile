# 🐳 Dockerfile para Painel Community
# Multi-stage build para otimização de tamanho e performance

# ========================================
# STAGE 1: Build da aplicação
# ========================================
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# ========================================
# STAGE 2: Servidor de produção
# ========================================
FROM nginx:alpine AS production

# Instalar Node.js para runtime (se necessário)
RUN apk add --no-cache nodejs npm

# Copiar build da aplicação
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 1978

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:1978/ || exit 1

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]

# ========================================
# STAGE 3: Desenvolvimento (opcional)
# ========================================
FROM node:18-alpine AS development

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies)
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta de desenvolvimento
EXPOSE 1978

# Comando de desenvolvimento
CMD ["npm", "run", "dev"] 