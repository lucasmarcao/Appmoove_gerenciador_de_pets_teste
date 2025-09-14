import "./navbar.css";

function NavBar() {
    return (
        <nav
            className="navbar navbar-expand-lg bg-info nav-pet-desafio"
            data-bs-theme="light"
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    AdoteUmPet
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/listagem-de-pets/">
                                Listagem de Pets
                            </a>
                        </li>
                        <li className="nav-item dropdown soEmMobile">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="/grafico-pets/"
                                    >
                                        Grafico de Pets
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/docs">
                                        Documentação
                                    </a>
                                </li>
                                {/* <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="/gerar-planilha"
                                    >
                                        Gerar Planilha
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cadastro-de-pet/">
                                Cadastro de Pet
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cidades-com-pet/">
                                Cidades com Pet
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/explorar-racas/">
                                Explorar Raças
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
