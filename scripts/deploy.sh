#!/bin/bash

# 🚀 Script de Deploy - Painel Community
# Automatiza o processo de deploy no Docker Swarm

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Configurações
ENVIRONMENT=${1:-test}
STACK_NAME="painelcommunity-${ENVIRONMENT}"
COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

# Verificar se o arquivo docker-compose existe
if [ ! -f "$COMPOSE_FILE" ]; then
    error "Arquivo $COMPOSE_FILE não encontrado!"
fi

log "🚀 Iniciando deploy do Painel Community ($ENVIRONMENT)"

# Verificar se estamos no diretório correto
if [ ! -f "docker-compose.test.yml" ]; then
    error "Execute este script no diretório raiz do projeto!"
fi

# Verificar se o Docker Swarm está ativo
if ! docker info | grep -q "Swarm: active"; then
    error "Docker Swarm não está ativo!"
fi

# Verificar se a rede proxy existe
if ! docker network ls | grep -q "proxy"; then
    error "Rede 'proxy' não encontrada! Crie a rede primeiro."
fi

# Criar volumes se não existirem
log "📦 Verificando volumes..."
docker volume create painelcommunity_postgres_data 2>/dev/null || warning "Volume postgres_data já existe"
docker volume create painelcommunity_redis_data 2>/dev/null || warning "Volume redis_data já existe"

# Fazer pull das imagens mais recentes
log "📥 Fazendo pull das imagens..."
docker pull alltomatos/painel-community:latest || warning "Erro ao fazer pull da imagem frontend"
docker pull alltomatos/painel-community-api:latest || warning "Erro ao fazer pull da imagem backend"

# Deploy da stack
log "🚀 Deployando stack $STACK_NAME..."
docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"

# Aguardar serviços ficarem prontos
log "⏳ Aguardando serviços ficarem prontos..."
sleep 30

# Verificar status dos serviços
log "📊 Verificando status dos serviços..."
docker service ls | grep "$STACK_NAME" || error "Nenhum serviço encontrado para $STACK_NAME"

# Health check
log "🏥 Executando health check..."
if [ "$ENVIRONMENT" = "test" ]; then
    HEALTH_URL="https://test.painel.alltomatos.app.br:51978/health"
else
    HEALTH_URL="https://painel.alltomatos.app.br:51978/health"
fi

# Tentar health check algumas vezes
for i in {1..5}; do
    if curl -f "$HEALTH_URL" >/dev/null 2>&1; then
        success "Health check passou!"
        break
    else
        warning "Health check falhou (tentativa $i/5)"
        sleep 10
    fi
done

# Mostrar informações finais
log "📋 Informações do deploy:"
echo "   Stack: $STACK_NAME"
echo "   Ambiente: $ENVIRONMENT"
if [ "$ENVIRONMENT" = "test" ]; then
    echo "   URL: https://test.painel.alltomatos.app.br"
    echo "   API: https://api-test.painel.alltomatos.app.br"
else
    echo "   URL: https://painel.alltomatos.app.br"
    echo "   API: https://api.painel.alltomatos.app.br"
fi

success "✅ Deploy concluído com sucesso!"

# Comandos úteis
echo ""
log "🔧 Comandos úteis:"
echo "   Ver logs: docker service logs ${STACK_NAME}_painelcommunity_frontend"
echo "   Ver status: docker service ls | grep $STACK_NAME"
echo "   Remover stack: docker stack rm $STACK_NAME"
echo "   Escalar serviço: docker service scale ${STACK_NAME}_painelcommunity_frontend=2" 