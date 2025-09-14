import "./docs.css";

export default function Docs() {
    return (
        <div className="container py-4 meudocs">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center mb-4">
                        📚 Documentação do AdoteUmPet
                    </h2>

                    <div className="alert alert-info text-center">
                        <h4>
                            🐾 Sistema Completo de Gerenciamento de Pets para
                            Adoção
                        </h4>
                        <p className="mb-0">
                            Desenvolvido por Lucas Antônio Marcão
                        </p>
                    </div>
                </div>
            </div>

            {/* Seção Sobre o Projeto */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h3>🎯 Sobre o Projeto</h3>
                        </div>
                        <div className="card-body">
                            <p>
                                O <strong>AdoteUmPet</strong> é uma aplicação
                                completa para gerenciamento de pets disponíveis
                                para adoção, com integração a APIs externas para
                                obtenção de informações sobre raças de cães e
                                gatos.
                            </p>
                            <p className="mb-0">
                                <strong>Objetivo:</strong> Construir uma
                                aplicação completa para gerenciar pets para
                                adoção e consultar informações de raças,
                                atendendo a todos os requisitos do desafio
                                técnico.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tecnologias Utilizadas */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h3>🛠️ Tecnologias Utilizadas</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <h5>Backend</h5>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tecnologia</th>
                                                    <th>Versão</th>
                                                    <th>Finalidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Java</td>
                                                    <td>17+</td>
                                                    <td>Linguagem principal</td>
                                                </tr>
                                                <tr>
                                                    <td>Spring Boot</td>
                                                    <td>3.5.5</td>
                                                    <td>Framework backend</td>
                                                </tr>
                                                <tr>
                                                    <td>PostgreSQL</td>
                                                    <td>15+</td>
                                                    <td>Banco de dados</td>
                                                </tr>
                                                <tr>
                                                    <td>JPA/Hibernate</td>
                                                    <td>6.4.4</td>
                                                    <td>
                                                        ORM para persistência
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Maven</td>
                                                    <td>3.8+</td>
                                                    <td>
                                                        Gerenciamento de
                                                        dependências
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>Frontend</h5>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tecnologia</th>
                                                    <th>Versão</th>
                                                    <th>Finalidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>React</td>
                                                    <td>18+</td>
                                                    <td>Framework frontend</td>
                                                </tr>
                                                <tr>
                                                    <td>TypeScript</td>
                                                    <td>4.9+</td>
                                                    <td>Tipagem estática</td>
                                                </tr>
                                                <tr>
                                                    <td>Bootstrap</td>
                                                    <td>5.3+</td>
                                                    <td>Framework CSS</td>
                                                </tr>
                                                <tr>
                                                    <td>Chart.js</td>
                                                    <td>4.4+</td>
                                                    <td>
                                                        Gráficos e visualizações
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>React Router</td>
                                                    <td>6.8+</td>
                                                    <td>Roteamento SPA</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Funcionalidades Implementadas */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-info text-white">
                            <h3>🚀 Funcionalidades Implementadas</h3>
                        </div>
                        <div className="card-body">
                            <h5 className="mb-3">✅ Requisitos Obrigatórios</h5>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Funcionalidade</th>
                                            <th>Status</th>
                                            <th>Detalhes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Backend API REST</td>
                                            <td>✅ Completo</td>
                                            <td>
                                                Java Spring Boot com PostgreSQL
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Banco de Dados</td>
                                            <td>✅ Completo</td>
                                            <td>
                                                Tabela pets com todas as colunas
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CRUD Completo</td>
                                            <td>✅ Completo</td>
                                            <td>
                                                Create, Read, Update, Delete
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Filtros e Paginação</td>
                                            <td>✅ Completo</td>
                                            <td>
                                                Nome, espécie, raça, cidade,
                                                status
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Integração com APIs</td>
                                            <td>✅ Completo</td>
                                            <td>TheDogAPI e TheCatAPI</td>
                                        </tr>
                                        <tr>
                                            <td>Frontend React</td>
                                            <td>✅ Completo</td>
                                            <td>
                                                Interface responsiva e moderna
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estrutura do Banco de Dados */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-warning text-dark">
                            <h3>🗃️ Estrutura do Banco de Dados</h3>
                        </div>
                        <div className="card-body">
                            <pre className="bg-light p-3 rounded">
                                {`CREATE TABLE pets (
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
);`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Endpoints da API */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-secondary text-white">
                            <h3>🌐 Endpoints da API</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <h5>Pets Endpoints</h5>
                                    <div className="table-responsive">
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Método</th>
                                                    <th>Endpoint</th>
                                                    <th>Descrição</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            GET
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>/pets</code>
                                                    </td>
                                                    <td>
                                                        Lista pets com filtros e
                                                        paginação
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            GET
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            /pets/&#123;id&#125;
                                                        </code>
                                                    </td>
                                                    <td>
                                                        Obtém detalhes de um pet
                                                        específico
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-primary">
                                                            POST
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>/pets</code>
                                                    </td>
                                                    <td>
                                                        Cadastra um novo pet
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-warning">
                                                            PUT
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            /pets/&#123;id&#125;
                                                        </code>
                                                    </td>
                                                    <td>
                                                        Atualiza um pet
                                                        existente
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-danger">
                                                            DELETE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            /pets/&#123;id&#125;
                                                        </code>
                                                    </td>
                                                    <td>Remove um pet</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>Breeds Endpoints</h5>
                                    <div className="table-responsive">
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Método</th>
                                                    <th>Endpoint</th>
                                                    <th>Descrição</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            GET
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            /breeds/&#123;species&#125;
                                                        </code>
                                                    </td>
                                                    <td>
                                                        Busca raças por espécie
                                                        (dog/cat)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            GET
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            /breeds/&#123;species&#125;?name=&#123;nome&#125;
                                                        </code>
                                                    </td>
                                                    <td>
                                                        Busca raças por nome
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Como Executar */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h3>⚙️ Como Executar o Projeto</h3>
                        </div>
                        <div className="card-body">
                            <h5>Pré-requisitos</h5>
                            <ul>
                                <li>Java 17+</li>
                                <li>Node.js 18+</li>
                                <li>PostgreSQL 15+</li>
                                <li>Maven 3.8+</li>
                            </ul>

                            <h5>1. Clone o Repositório</h5>
                            <pre className="bg-light p-3 rounded">
                                git clone
                                https://github.com/lucasmarcao/adote-um-pet.git
                                cd adote-um-pet
                            </pre>

                            <h5>2. Configuração do Backend</h5>
                            <p>Crie o banco de dados:</p>
                            <pre className="bg-light p-3 rounded">
                                CREATE DATABASE adote_um_pet WITH OWNER =
                                postgres ENCODING = 'UTF8' CONNECTION LIMIT =
                                -1;
                            </pre>

                            <h5>3. Configuração do Frontend</h5>
                            <p>
                                Crie o arquivo <code>.env</code>:
                            </p>
                            <pre className="bg-light p-3 rounded">
                                VITE_API_URL=http://localhost:8087/pets/
                                VITE_BREEDS_API_URL=http://localhost:8087
                            </pre>

                            <h5>4. Acessar a Aplicação</h5>
                            <ul>
                                <li>Frontend: http://localhost:5173</li>
                                <li>Backend: http://localhost:8087</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diferenciais */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h3>⭐ Diferenciais Implementados</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-header bg-success text-white">
                                            <h6>Funcionalidades Avançadas</h6>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>Design Responsivo</li>
                                                <li>Experiência do Usuário</li>
                                                <li>Performance</li>
                                                <li>Validações</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-header bg-info text-white">
                                            <h6>Boas Práticas</h6>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>Código Limpo</li>
                                                <li>Separação de Conceitos</li>
                                                <li>Variáveis de Ambiente</li>
                                                <li>Tratamento de Erros</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-header bg-warning text-dark">
                                            <h6>Integrações</h6>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>APIs Externas</li>
                                                <li>Normalização de Dados</li>
                                                <li>Fallbacks</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contato */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>📞 Contato</h5>
                            <p>
                                <strong>Lucas Antônio Marcão</strong>
                            </p>
                            <p>
                                Email:{" "}
                                <a href="mailto:lucas2004marcao@gmail.com">
                                    lucas2004marcao@gmail.com
                                </a>
                            </p>
                            <p>
                                LinkedIn:{" "}
                                <a
                                    href="https://www.linkedin.com/in/lucas-marcao/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    linkedin.com/in/lucas-marcao
                                </a>
                            </p>
                            <p>
                                GitHub:{" "}
                                <a
                                    href="https://github.com/lucasmarcao"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    github.com/lucasmarcao
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
