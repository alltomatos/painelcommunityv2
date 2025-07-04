const { spawn } = require('child_process');
const http = require('http');

function waitForApi(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    function check() {
      http.get(url, res => {
        if (res.statusCode === 200) resolve();
        else retry();
      }).on('error', retry);
    }
    function retry() {
      if (Date.now() - start > timeout) reject(new Error('Timeout esperando API'));
      else setTimeout(check, 1000);
    }
    check();
  });
}

async function main() {
  // Inicia o backend
  const backend = spawn('npm', ['run', 'start:dev'], { cwd: './api', shell: true, stdio: 'inherit' });

  try {
    // Aguarda o endpoint /api responder
    console.log('Aguardando backend subir...');
    await waitForApi('http://localhost:1986/api');
    console.log('Backend pronto! Executando Playwright...');
    // Executa os testes Playwright
    const playwright = spawn('npx', ['playwright', 'test'], { cwd: './api', shell: true, stdio: 'inherit' });
    playwright.on('exit', code => {
      backend.kill();
      process.exit(code);
    });
  } catch (err) {
    console.error('Erro ao subir backend:', err);
    backend.kill();
    process.exit(1);
  }
}

main(); 