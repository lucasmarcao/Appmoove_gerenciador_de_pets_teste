# BackEnd Spring Boot - Guia de Configuração e Execução

## Pré-requisitos

-   Java JDK 17 ou superior
-   PostgreSQL 12 ou superior
-   Maven 3.6+ ou Gradle 7.x (dependendo da configuração do projeto)
-   Variáveis de ambiente configuradas corretamente

## Configuração do Ambiente

### 1. Instalação do PostgreSQL

**Windows:**

-   Baixe o instalador em: https://www.postgresql.org/download/windows/
-   Siga o assistente de instalação
-   Anote o username e password definidos durante a instalação

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
```

### 2. Configuração do Banco de Dados

```sql
-- Conecte-se ao PostgreSQL como usuário postgres
sudo -u postgres psql

-- Crie o banco de dados
CREATE DATABASE Appmoove_pets_teste;

-- Verifique se o banco foi criado
\l
```

### 3. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto ou na pasta `./BackEnd/` com o seguinte conteúdo:

```properties
MYSQLDB_USER=postgres
MYSQLDB_ROOT_PASSWORD=Enquebravel11
API_KEY_DOG=sua_chave_api_cachorro
API_KEY_CAT=sua_chave_api_gato
```

### 4. Instalação das Dependências

```bash
# Se usar Maven
mvn clean install

# Se usar Gradle
gradle build
```

## Execução da Aplicação

### Opção 1: Executar via IDE

1. Abra o projeto em sua IDE (IntelliJ, Eclipse, VS Code)
2. Localize a classe principal (normalmente anotada com `@SpringBootApplication`)
3. Execute como aplicação Java

### Opção 2: Executar via linha de comando

```bash
# Com Maven
mvn spring-boot:run

# Com Gradle
gradle bootRun

# Ou executar o jar diretamente
java -jar target/nome-do-seu-projeto.jar
```

## Solução de Problemas Comuns

### Erro: "Connection refused" ao conectar com PostgreSQL

**Causa:** PostgreSQL não está rodando ou credenciais incorretas
**Solução:**

```bash
# Verifique se o serviço está ativo
sudo systemctl status postgresql

# Inicie o serviço se necessário
sudo systemctl start postgresql

# Verifique se o usuário/senha estão corretos no arquivo .env
```

### Erro: "Port 8087 already in use"

**Causa:** Outra aplicação está usando a porta 8087
**Solução:**

```bash
# Encontre o processo usando a porta
lsof -i :8087

# Termine o processo ou altere a porta no application.properties
# Altere server.port para outra porta (ex: 8088)
```

### Erro: "Environment variable not found"

**Causa:** Variáveis de ambiente não configuradas corretamente
**Solução:**

-   Verifique se o arquivo `.env` existe no local correto
-   Confirme se os nomes das variáveis correspondem ao application.properties
-   Reinicie o terminal/IDE após criar o arquivo .env

### Erro: "Driver class not found"

**Causa:** Dependência do PostgreSQL não está no classpath
**Solução:**

```xml
<!-- Verifique no pom.xml se existe esta dependência: -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Erro de permissão no PostgreSQL

**Causa:** Usuário não tem permissão para acessar o banco
**Solução:**

```sql
-- Conceda todas as permissões ao usuário
GRANT ALL PRIVILEGES ON DATABASE Appmoove_pets_teste TO postgres;
```

## Estrutura do Projeto

```
SeuProjeto/
├── BackEnd/
│   ├── src/
│   ├── .env
│   └── application.properties
├── .env
└── README.md
```

## Testando a Aplicação

Após iniciar a aplicação, acesse:

-   http://localhost:8087/actuator/health para verificar o status
-   Verifique os logs para confirmar que a conexão com o BD foi bem-sucedida

## Dicas Adicionais

1. Sempre verifique os logs da aplicação para detalhes de erros
2. Use ferramentas como pgAdmin para gerenciar visualmente o PostgreSQL
3. Para desenvolvimento, considere usar Docker para o PostgreSQL:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=Enquebravel11 -d -p 5432:5432 postgres
```

Este guia deve ajudar a configurar e executar o projeto Spring Boot com sucesso. Em caso de problemas adicionais, verifique a documentação oficial do Spring Boot e PostgreSQL.
