# 🐾 AdoteUmPet - Sistema de Gerenciamento de Pets para Adoção

## 👨‍💻 Desenvolvedor

**Lucas Antônio Marcão**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-marcao/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucasmarcao)

**Formação:**

-   🎓 Técnico em Informática - UTFPR (Concluído)
-   🎓 Bacharelado em Ciências da Computação - UTFPR (Cursando)

**Experiência Profissional:**

-   🏢 TYTOTECH CAMPO MOURÃO - Estagiário Front-End (2021-2022)
-   💻 Desenvolvimento Angular, PHP, React, integração com APIs

## 📋 Sobre o Projeto

O **AdoteUmPet** é uma aplicação completa para gerenciamento de pets disponíveis para adoção, com integração a APIs externas para obtenção de informações sobre raças de cães e gatos.

### 🎯 Objetivo

Construir uma aplicação completa para gerenciar pets para adoção e consultar informações de raças, atendendo a todos os requisitos do desafio técnico.

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia    | Versão | Finalidade                    |
| ------------- | ------ | ----------------------------- |
| Java          | 17+    | Linguagem principal           |
| Spring Boot   | 3.5.5  | Framework backend             |
| PostgreSQL    | 15+    | Banco de dados                |
| JPA/Hibernate | 6.4.4  | ORM para persistência         |
| Maven         | 3.8+   | Gerenciamento de dependências |

### Frontend

| Tecnologia   | Versão | Finalidade               |
| ------------ | ------ | ------------------------ |
| React        | 18+    | Framework frontend       |
| TypeScript   | 4.9+   | Tipagem estática         |
| Bootstrap    | 5.3+   | Framework CSS            |
| Chart.js     | 4.4+   | Gráficos e visualizações |
| React Router | 6.8+   | Roteamento SPA           |

## 🚀 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios

| Funcionalidade          | Status      | Detalhes                            |
| ----------------------- | ----------- | ----------------------------------- |
| **Backend API REST**    | ✅ Completo | Java Spring Boot com PostgreSQL     |
| **Banco de Dados**      | ✅ Completo | Tabela pets com todas as colunas    |
| **CRUD Completo**       | ✅ Completo | Create, Read, Update, Delete        |
| **Filtros e Paginação** | ✅ Completo | Nome, espécie, raça, cidade, status |
| **Integração com APIs** | ✅ Completo | TheDogAPI e TheCatAPI               |
| **Frontend React**      | ✅ Completo | Interface responsiva e moderna      |

### 📊 Páginas e Componentes

| Página                      | Descrição                      | Status |
| --------------------------- | ------------------------------ | ------ |
| **Home**                    | Página inicial                 | ✅     |
| **Listagem de Pets**        | Filtros, paginação e ordenação | ✅     |
| **Cadastro de Pet**         | Formulário com validações      | ✅     |
| **Detalhe do Pet**          | Informações completas + mapa   | ✅     |
| **Explorar Raças**          | Integração com APIs externas   | ✅     |
| **Gráfico de Distribuição** | Chart.js com faixas etárias    | ✅     |

## 🗃️ Estrutura do Banco de Dados

### Tabela `pets`

```sql
CREATE TABLE pets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(3) CHECK (species IN ('dog', 'cat')) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age_years INT CHECK (age_years >= 0),
    shelter_city VARCHAR(100) NOT NULL,
    shelter_lat DECIMAL(10,7) NOT NULL,
    shelter_lng DECIMAL(10,7) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('available', 'adopted')) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Endpoints da API

### Pets Endpoints

| Método   | Endpoint     | Descrição                           |
| -------- | ------------ | ----------------------------------- |
| `GET`    | `/pets`      | Lista pets com filtros e paginação  |
| `GET`    | `/pets/{id}` | Obtém detalhes de um pet específico |
| `POST`   | `/pets`      | Cadastra um novo pet                |
| `PUT`    | `/pets/{id}` | Atualiza um pet existente           |
| `DELETE` | `/pets/{id}` | Remove um pet                       |

### Breeds Endpoints

| Método | Endpoint                        | Descrição                         |
| ------ | ------------------------------- | --------------------------------- |
| `GET`  | `/breeds/{species}`             | Busca raças por espécie (dog/cat) |
| `GET`  | `/breeds/{species}?name={nome}` | Busca raças por nome              |

### Exemplo de Resposta

```json
{
    "total": 26,
    "size": 9,
    "page": 2,
    "content": [
        {
            "name": "Birman",
            "origin": "France",
            "life_span": "14 - 15",
            "temperament": "Affectionate, Active, Gentle, Social",
            "image_url": "https://cdn2.thecatapi.com/images/HOrX5gwLS.jpg"
        }
    ]
}
```

## ⚙️ Como Executar o Projeto

### Pré-requisitos

-   Java 17+
-   Node.js 18+
-   PostgreSQL 15+
-   Maven 3.8+

### 1. Clone o Repositório

```bash
git clone https://github.com/lucasmarcao/adote-um-pet.git
cd adote-um-pet
```

### 2. Configuração do Backend

#### Banco de Dados

```sql
CREATE DATABASE adote_um_pet
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
```

#### Variáveis de Ambiente

Crie o arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/adote_um_pet
spring.datasource.username=postgres
spring.datasource.password=sua_senha

# API Keys
minha.aplicacao.api-key-dog=live_kxfKAYcWTviLVSWSPYP6iGcw5ltIbOGfaZfHESPpxK6PalKptTRnmzp6H8zlauxP
minha.aplicacao.api-key-cat=live_cn9U3MpBSnW3JQmDPIFL48UiMUO1MLKGb8FOJCbli0oD59QW0Qu9OxMzRA05nD9l
```

#### Executar Backend

```bash
cd BackEnd
mvn spring-boot:run
```

### 3. Configuração do Frontend

#### Variáveis de Ambiente

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:8087/pets/
VITE_BREEDS_API_URL=http://localhost:8087
```

#### Instalar Dependências

```bash
cd FrontEnd
npm install
```

#### Executar Frontend

```bash
npm run dev
```

### 4. Acessar a Aplicação

-   Frontend: http://localhost:5173
-   Backend: http://localhost:8087

## 🧪 Testes

### Executar Testes no Backend

```bash
cd BackEnd
mvn test
```

### Executar Testes no Frontend

```bash
cd FrontEnd
npm test
```

### Cobertura de Testes

```bash
# Gerar relatório de cobertura
mvn jacoco:report
```

## 📋 Checklist de Implementação

### Backend ✅

-   [x] API REST com Spring Boot
-   [x] Modelo de dados com JPA/Hibernate
-   [x] Banco PostgreSQL configurado
-   [x] Endpoints CRUD completos
-   [x] Filtros e paginação
-   [x] Integração com TheDogAPI e TheCatAPI
-   [x] Tratamento de erros
-   [x] Validações de dados

### Frontend ✅

-   [x] Interface React com TypeScript
-   [x] Listagem com filtros e paginação
-   [x] Formulário de cadastro com validações
-   [x] Página de detalhes do pet
-   [x] Integração com APIs de raças
-   [x] Gráficos com Chart.js
-   [x] Design responsivo com Bootstrap
-   [x] Gestão de estado

### Funcionalidades Específicas ✅

-   [x] Filtros: nome, espécie, raça, cidade, status
-   [x] Paginação e ordenação
-   [x] Upload de imagens (placeholder)
-   [x] Mapas de localização
-   [x] Gráfico de distribuição etária
-   [x] Dropdown de cidades brasileiras

## 🎨 Diferenciais Implementados

### ⭐ Funcionalidades Avançadas

-   **Design Responsivo**: Interface adaptável para mobile e desktop
-   **Experiência do Usuário**: Loading states, error handling, empty states
-   **Performance**: Paginação eficiente para grandes conjuntos de dados
-   **Validações**: Formulários com validação frontend e backend

### 🔧 Boas Práticas

-   **Código Limpo**: Padrões consistentes e documentação
-   **Separação de Conceitos**: Arquitetura em camadas
-   **Variáveis de Ambiente**: Configuração segura com .env
-   **Tratamento de Erros**: Mensagens amigáveis para usuários

### 📊 Integrações

-   **APIs Externas**: TheDogAPI e TheCatAPI com chaves configuráveis
-   **Normalização de Dados**: Resposta padronizada das APIs externas
-   **Fallbacks**: Imagens placeholder quando não disponíveis

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Lucas Antônio Marcão**

-   Email: [lucas2004marcao@gmail.com](mailto:lucas2004marcao@gmail.com)
-   LinkedIn: [https://www.linkedin.com/in/lucas-marcao/](https://www.linkedin.com/in/lucas-marcao/)
-   GitHub: [https://github.com/lucasmarcao](https://github.com/lucasmarcao)

## 📄 Licença

Este projeto num tem licença :( .

## 🙏 Agradecimentos

-   Equipe AppMoove pelo desafio técnico
-   TheDogAPI e TheCatAPI pelos dados de raças
-   Comunidade Spring Boot e React pelas excelentes documentações

---

**🐶🐱 AdoteUmPet - Tornando a adoção de pets mais fácil e eficiente!**

VRAUUUU !!!!
