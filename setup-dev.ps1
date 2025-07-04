# 🚀 Script de Setup - Painel Community (Desenvolvimento Local)
# Configura o ambiente de desenvolvimento

Write-Host "🏠 Configurando ambiente de desenvolvimento local..." -ForegroundColor Green

# Verificar se Node.js está instalado
Write-Host "📋 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "📥 Instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "💡 Ou execute: winget install OpenJS.NodeJS" -ForegroundColor Yellow
    exit 1
}

# Verificar se npm está disponível
Write-Host "📦 Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado!" -ForegroundColor Red
    exit 1
}

# Instalar dependências
Write-Host "📥 Instalando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    exit 1
}

# Verificar se o build funciona
Write-Host "🏗️ Testando build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro no build!" -ForegroundColor Red
    exit 1
}

# Criar arquivo .env local
Write-Host "⚙️ Configurando variáveis de ambiente..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Arquivo .env já existe!" -ForegroundColor Blue
}

Write-Host ""
Write-Host "🎉 Ambiente configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Comandos úteis:" -ForegroundColor Cyan
Write-Host "   npm run dev     - Iniciar servidor de desenvolvimento" -ForegroundColor White
Write-Host "   npm run build   - Build para produção" -ForegroundColor White
Write-Host "   npm run lint    - Verificar código" -ForegroundColor White
Write-Host "   npm run preview - Preview do build" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Servidor de desenvolvimento: http://localhost:51978" -ForegroundColor Cyan
Write-Host "" 