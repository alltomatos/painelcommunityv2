# Script: run-frontend.ps1
# Uso: ./run-frontend.ps1 <comando-npm>
# Exemplo: ./run-frontend.ps1 dev

param(
  [Parameter(Mandatory=$true)]
  [string]$NpmCommand
)

$frontendPath = "D:\projetos\crm\painelcommunity"
$frontendPort = 1978

# Verifica se a porta já está em uso
$portUsed = netstat -ano | Select-String ":$frontendPort "

if ($portUsed) {
    Write-Host "Frontend já está rodando na porta $frontendPort."
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

Write-Host "Executando 'npm run $NpmCommand' em $frontendPath..."
Push-Location $frontendPath
npm run $NpmCommand
Pop-Location 