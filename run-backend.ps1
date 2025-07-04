# Script: run-backend.ps1
# Uso: ./run-backend.ps1 <comando-npm>
# Exemplo: ./run-backend.ps1 start:dev

param(
  [Parameter(Mandatory=$true)]
  [string]$NpmCommand
)

$apiPath = "D:\projetos\crm\painelcommunity\api"
$backendPort = 1986

# Verifica se a porta já está em uso
$portUsed = netstat -ano | Select-String ":$backendPort "

if ($portUsed) {
    Write-Host "Servidor já está rodando na porta $backendPort."
    $procId = ($portUsed -split '\s+')[-1]
    Write-Host "Processo PID: $procId"
    $resp = Read-Host "Deseja derrubar o processo e reiniciar? (s/n)"
    if ($resp -eq 's') {
        Write-Host "Finalizando processo $procId..."
        Stop-Process -Id $procId -Force
        Start-Sleep -Seconds 2
    } else {
        Write-Host "Mantendo o servidor atual. Nenhuma ação executada."
        exit 0
    }
}

Write-Host "Executando 'npm run $NpmCommand' em $apiPath..."
Push-Location $apiPath
npm run $NpmCommand
Pop-Location 