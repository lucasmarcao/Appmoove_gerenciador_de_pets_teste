# Frontend React + TypeScript + Vite - Guia de Configuração

## Pré-requisitos

-   Node.js 18 ou superior
-   npm ou yarn
-   Backend Spring Boot rodando (conforme instruções do README do backend)

## Configuração do Ambiente

### 1. Instalação do Node.js

**Windows/Mac:**

-   Baixe o instalador em: https://nodejs.org/
-   Execute o instalador e siga as instruções

**Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Verificação da Instalação

```bash
node --version
npm --version
```

### 3. Instalação das Dependências

```bash
# Navegue até a pasta do frontend
cd frontend-react-pets

# Instale as dependências
npm install
```

## Execução da Aplicação

### Modo Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento na porta 5173 (padrão do Vite)
npm run dev

# Ou com yarn
yarn dev
```

### Build para Produção

```bash
# Gera os arquivos otimizados para produção na pasta 'dist'
npm run build

# Pré-visualiza a build de produção localmente
npm run preview
```

### Verificação de Código

```bash
# Executa o linter para verificar qualidade do código
npm run lint
```

## Estrutura do Projeto

```
frontend-react-pets/
├── src/
│   ├── components/     # Componentes React
│   ├── routes/        # Configuração de rotas (AppRoutes)
│   ├── css/           # Arquivos de estilo
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Ponto de entrada
├── public/            # Arquivos públicos
├── package.json       # Dependências e scripts
├── vite.config.ts     # Configuração do Vite
├── tsconfig.json      # Configuração do TypeScript
└── index.html         # HTML base
```

## Configuração Importante

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto frontend para configurar:

```env
# URL do backend (ajuste conforme necessário)
VITE_API_BASE_URL=http://localhost:8087/api

# Outras variáveis específicas do frontend
```

### Conexão com Backend

Certifique-se de que:

1. O backend está rodando na porta 8087 (ou ajuste a URL no código)
2. As CORS estão configuradas corretamente no backend

## Solução de Problemas Comuns

### Erro: "Port already in use"

**Causa:** Outra aplicação está usando a porta 5173
**Solução:**

```bash
# Execute o projeto em outra porta
npm run dev -- --port 3000

# Ou encontre e termine o processo usando a porta
npx kill-port 5173
```

### Erro: "Cannot find module" ou dependências não instaladas

**Causa:** Dependências do package.json não estão instaladas
**Solução:**

```bash
# Limpe o cache e reinstale as dependências
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro: "Failed to compile" com TypeScript

**Causa:** Erros de tipo no TypeScript
**Solução:**

```bash
# Verifique os erros de tipo
npm run lint

# Execute a compilação TypeScript separadamente
npx tsc --noEmit
```

### Erro: "Connection refused" ao conectar com backend

**Causa:** Backend não está rodando ou porta incorreta
**Solução:**

-   Verifique se o backend Spring Boot está rodando na porta 8087
-   Confirme a URL da API no código frontend
-   Verifique as configurações de CORS no backend

### Erro: "Module not found" para imports

**Causa:** Caminhos de importação incorretos
**Solução:**

-   Verifique os caminhos relativos nos imports
-   Confirme a estrutura de pastas do projeto
-   Use caminhos absolutos configurando no tsconfig.json:

```json
{
    "compilerOptions": {
        "baseUrl": "src",
        "paths": {
            "@/*": ["*"]
        }
    }
}
```

### Erro: Bootstrap não está funcionando

**Causa:** JavaScript do Bootstrap não está sendo carregado corretamente
**Solução:**

-   Verifique se o Bootstrap está importado em main.tsx:

```typescript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

## Dicas de Desenvolvimento

### Hot Reload

O Vite oferece Hot Module Replacement (HMR) que atualiza automaticamente as mudanças no navegador sem recarregar a página completa.

### Ferramentas de Desenvolvedor

-   Instale a extensão "React Developer Tools" no navegador
-   Use o console do navegador para debugging

### Testes

```bash
# Executar testes (se configurados)
npm test

# Executar testes com cobertura
npm test -- --coverage
```

## Build e Deploy

### Build Otimizado

```bash
npm run build
```

Isso criará uma pasta `dist` com arquivos otimizados para produção.

### Deploy em Servidor Estático

Os arquivos na pasta `dist` podem ser servidos por qualquer servidor web estático como:

-   Nginx
-   Apache
-   Serviços de hospedagem estática (Netlify, Vercel, GitHub Pages)

## Configuração Avançada

### Proxy para API no Desenvolvimento

No `vite.config.ts`, você pode configurar um proxy para evitar problemas de CORS:

```typescript
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8087",
                changeOrigin: true,
            },
        },
    },
});
```

Este guia deve ajudar a configurar e executar o frontend React com TypeScript e Vite. Em caso de problemas adicionais, consulte a documentação do [Vite](https://vitejs.dev/) e [React](https://react.dev/).
