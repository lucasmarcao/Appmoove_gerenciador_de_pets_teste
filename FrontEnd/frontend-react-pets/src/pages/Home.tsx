import "../css/home.css";

function Home() {
    return (
        <div className="centro margemVertical">
            <div className="container-fluid main-area">
                <div className="row">
                    <div className="col-12 text-center margemVertical">
                        <h2 className="welcome-text">Bem vindo A pagina !!!</h2>
                    </div>
                </div>

                <div className="row justify-content-center mb-4">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <div className="dog-icon" aria-hidden="true">
                            🐶
                        </div>
                        <div className="dog-icon" aria-hidden="true">
                            😺
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <section className="content-block">
                            <p className="lead-lorem">
                                O desafio técnico “AdoteUmPet” pede a construção
                                de uma aplicação full-stack para gerenciar pets
                                para adoção e consultar informações de raças. O
                                objetivo central é implementar uma API REST
                                (qualquer linguagem) conectada a um banco
                                relacional (MySQL ou PostgreSQL) e um frontend
                                em React ou Vue, entregando funcionalidades
                                reais: cadastro e listagem de pets com filtros,
                                detalhe com mapa da localização do abrigo e
                                integração com APIs externas
                                (TheDogAPI/TheCatAPI) para explorar raças. Além
                                de funcionar corretamente, a aplicação precisa
                                demonstrar boas práticas como uso de variáveis
                                de ambiente, migrações/seed, tratamento de erros
                                e documentação mínima (README + exemplos/Swagger
                                opcional).
                            </p>

                            <p className="lead-lorem">
                                Os requisitos pedem endpoints claros (POST
                                /pets, GET /pets, GET /pets/:id, GET
                                /breeds/:species), uma tabela pets com campos
                                essenciais (UUID, nome, espécie, raça, idade,
                                localização, status, created_at) e um frontend
                                com páginas de listagem, cadastro, detalhe,
                                explorar raças e visualizações (gráfico de
                                distribuição de idades; mapa embutido). A
                                entrega deve incluir testes (cobertura 60%
                                ideal), instruções de execução, opção de rodar
                                com Docker Compose, e envio do repositório ou
                                zip em até 72 horas — pontos extras vêm de
                                cache, CI, Swagger e seed idempotente.
                            </p>
                        </section>

                        <h6 className="mt-4 text-center small-title">
                            outras informações
                        </h6>

                        <section className="content-block">
                            <p className="lead-lorem">
                                No backend priorize uma API bem estruturada:
                                rotas versionadas, validações robustas
                                (incluindo ranges de latitude/longitude),
                                tratamento de erros consistente e respostas
                                paginadas com (total, page, items). Use
                                migrations para controlar o esquema e um seed
                                idempotente (CSV) para popular dados de teste.
                                Inclua testes unitários e de integração para
                                endpoints críticos; ferramentas de coverage e
                                lint no CI ajudam a demonstrar qualidade. Um
                                cache simples para /breeds/:species e para
                                filtros pesados reduz chamadas externas e
                                melhora a UX.
                            </p>

                            <p className="lead-lorem mb-5">
                                No frontend, componha páginas reutilizáveis e
                                acessíveis: formulário de cadastro com
                                validações em tempo real e feedback, listagem
                                com filtros persistentes e ordenação, e uma
                                página de detalhe com mapa (Leaflet preferível)
                                e imagens/descrições completas do pet. Use
                                Chart.js para o gráfico de faixas etárias e um
                                dropdown estático para cidades brasileiras.
                                Garanta responsividade (media queries e grid do
                                Bootstrap), estados de loading/empty/error
                                claros, e boas práticas de gerenciamento de
                                estado (Context, Redux, Pinia, etc.).
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
