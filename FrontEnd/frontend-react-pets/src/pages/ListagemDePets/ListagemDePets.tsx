import { useState, useEffect, useRef } from "react";
import { getListarPets, getPetsPage } from "../ts/requisicoes.ts";
import { getPetsWithFilters } from "../ts/requisicoes.ts";
import ItemList from "../components/ListagemDePets/ItemList.tsx";
import type { MyPet, PetPage } from "../ts/requisicoes.ts";
import "./listagem.css";

export default function ListagemDePets() {
    // let dados: Promise<void> | null | undefined = main();
    console.clear();

    const [petPage, setPetPage] = useState<PetPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filtros
    const [filters, setFilters] = useState({
        name: "",
        species: "",
        breed: "",
        shelter_city: "",
        status: "",
    });

    // Paginação
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        size: 12,
    });

    // Ordenação
    const [sort, setSort] = useState({
        sortBy: "createdAt",
        order: "desc",
    });

    // Use ref para controlar a primeira execução do useEffect
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            fetchPets();
        } else {
            fetchPets();
        }
    }, [filters, pageInfo, sort]);

    const fetchPets = async () => {
        setLoading(true);
        setError(null);

        try {
            const pageData: PetPage = await getPetsWithFilters(
                filters.name,
                filters.species,
                filters.breed,
                filters.shelter_city,
                filters.status,
                pageInfo.page,
                pageInfo.size,
                sort.sortBy,
                sort.order
            );

            setPetPage(pageData);
        } catch (err) {
            setError("Erro ao carregar pets. Tente novamente.");
            console.error("Erro ao buscar pets:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPageInfo((prev) => ({ ...prev, page: 0 }));
    };

    const handleStatusChange = (status: string) => {
        setFilters((prev) => ({ ...prev, status }));
        setPageInfo((prev) => ({ ...prev, page: 0 }));
    };

    const handleSortChange = (sortBy: string, order: string) => {
        setSort({ sortBy, order });
    };

    const handlePageChange = (newPage: number) => {
        setPageInfo((prev) => ({ ...prev, page: newPage }));
    };

    const handleSizeChange = (newSize: number) => {
        setPageInfo((prev) => ({ ...prev, size: newSize, page: 0 }));
    };

    const handleResetFilters = () => {
        setFilters({
            name: "",
            species: "",
            breed: "",
            shelter_city: "",
            status: "",
        });
        setPageInfo({ page: 0, size: 12 });
        setSort({ sortBy: "createdAt", order: "desc" });
    };

    const totalPages = petPage ? Math.ceil(petPage.total / pageInfo.size) : 0;

    return (
        <div className="centro">
            <div className="margemVertical ListPai">
                <div className="container">
                    <div id="erro1"></div>
                    <nav aria-label="breadcrumb" className="my-3">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Home</a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Listagem de Pets
                            </li>
                        </ol>
                    </nav>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="mb-0">Listagem de Pets</h3>
                            <small className="text-muted">
                                Filtros, paginação e ordenação
                            </small>
                        </div>
                    </div>

                    <div className="row g-3">
                        <aside className="col-12 col-lg-3 d-none d-lg-block">
                            <div className="card sticky-card">
                                <div className="card-body">
                                    <form
                                        id="filtersForm"
                                        className="needs-validation"
                                        noValidate
                                    >
                                        <div className="mb-3">
                                            <label
                                                htmlFor="filterName"
                                                className="form-label"
                                            >
                                                Nome
                                            </label>
                                            <input
                                                id="filterName"
                                                className="form-control"
                                                name="name"
                                                type="search"
                                                placeholder="Ex.: Luna"
                                                value={filters.name}
                                                onChange={handleFilterChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="filterSpecies"
                                                className="form-label"
                                            >
                                                Espécie
                                            </label>
                                            <select
                                                id="filterSpecies"
                                                className="form-select"
                                                name="species"
                                                value={filters.species}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todas</option>
                                                <option value="dog">Cão</option>
                                                <option value="cat">
                                                    Gato
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="filterBreed"
                                                className="form-label"
                                            >
                                                Raça
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    id="filterBreed"
                                                    className="form-control"
                                                    name="breed"
                                                    placeholder="Ex.: Labrador"
                                                    value={filters.breed}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#breedPicker"
                                                >
                                                    Selecionar
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="filterCity"
                                                className="form-label"
                                            >
                                                Cidade
                                            </label>
                                            <select
                                                id="filterCity"
                                                className="form-select"
                                                name="shelter_city"
                                                value={filters.shelter_city}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todas</option>
                                                <option value="sao_paulo">
                                                    São Paulo
                                                </option>
                                                <option value="rio_de_janeiro">
                                                    Rio de Janeiro
                                                </option>
                                                <option value="curitiba">
                                                    Curitiba
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label d-block">
                                                Status
                                            </label>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Status"
                                            >
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="status"
                                                    id="statusAll"
                                                    autoComplete="off"
                                                    checked={
                                                        filters.status === ""
                                                    }
                                                    onChange={() =>
                                                        handleStatusChange("")
                                                    }
                                                />
                                                <label
                                                    className="btn btn-outline-primary btn-sm"
                                                    htmlFor="statusAll"
                                                >
                                                    Todos
                                                </label>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="status"
                                                    id="statusAvailable"
                                                    autoComplete="off"
                                                    checked={
                                                        filters.status ===
                                                        "available"
                                                    }
                                                    onChange={() =>
                                                        handleStatusChange(
                                                            "available"
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="btn btn-outline-primary btn-sm"
                                                    htmlFor="statusAvailable"
                                                >
                                                    Disponível
                                                </label>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="status"
                                                    id="statusAdopted"
                                                    autoComplete="off"
                                                    checked={
                                                        filters.status ===
                                                        "adopted"
                                                    }
                                                    onChange={() =>
                                                        handleStatusChange(
                                                            "adopted"
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="btn btn-outline-primary btn-sm"
                                                    htmlFor="statusAdopted"
                                                >
                                                    Adotado
                                                </label>
                                            </div>
                                        </div>

                                        <div
                                            className="accordion mb-3"
                                            id="filterAccordion"
                                        >
                                            <div className="accordion-item">
                                                <h2
                                                    className="accordion-header"
                                                    id="headingOne"
                                                >
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Avançado
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseOne"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="headingOne"
                                                    data-bs-parent="#filterAccordion"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="mb-2">
                                                            <label
                                                                htmlFor="ageFrom"
                                                                className="form-label"
                                                            >
                                                                Idade mínima
                                                            </label>
                                                            <input
                                                                id="ageFrom"
                                                                className="form-control"
                                                                name="age_from"
                                                                type="number"
                                                                min="0"
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <label
                                                                htmlFor="ageTo"
                                                                className="form-label"
                                                            >
                                                                Idade máxima
                                                            </label>
                                                            <input
                                                                id="ageTo"
                                                                className="form-control"
                                                                name="age_to"
                                                                type="number"
                                                                min="0"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary w-100"
                                                onClick={fetchPets}
                                            >
                                                Aplicar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary w-100"
                                                onClick={handleResetFilters}
                                            >
                                                Limpar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </aside>

                        <section className="col-12 col-lg-9">
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 gap-2">
                                <div className="d-flex align-items-center gap-2 displayBlockCelular">
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Ordenação"
                                    >
                                        <button
                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                            type="button"
                                            id="orderDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Ordenar
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="orderDropdown"
                                        >
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "name",
                                                            "asc"
                                                        )
                                                    }
                                                >
                                                    Nome ↑
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "name",
                                                            "desc"
                                                        )
                                                    }
                                                >
                                                    Nome ↓
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "ageYears",
                                                            "asc"
                                                        )
                                                    }
                                                >
                                                    Idade ↑
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "ageYears",
                                                            "desc"
                                                        )
                                                    }
                                                >
                                                    Idade ↓
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "createdAt",
                                                            "asc"
                                                        )
                                                    }
                                                >
                                                    Mais antigos
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            "createdAt",
                                                            "desc"
                                                        )
                                                    }
                                                >
                                                    Mais recentes
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            id="globalSearch"
                                            className="form-control"
                                            name="q"
                                            type="search"
                                            placeholder="Pesquisar por nome, raça..."
                                            value={filters.name}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={fetchPets}
                                        >
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <div className="form-text small text-muted d-none d-sm-block">
                                        Exibindo{" "}
                                        <span
                                            className="fw-semibold"
                                            id="totalCount"
                                        >
                                            {petPage?.total || 0}
                                        </span>{" "}
                                        resultados
                                    </div>
                                    <select
                                        id="perPage"
                                        className="form-select form-select-sm w-auto"
                                        value={pageInfo.size}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        <option value={6}>6</option>
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                        <option value={48}>48</option>
                                    </select>
                                </div>
                            </div>

                            <div id="resultsArea">
                                {loading && (
                                    <div className="text-center">
                                        Carregando...
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                {!loading &&
                                    !error &&
                                    petPage &&
                                    petPage.content.length === 0 && (
                                        <div className="alert alert-info">
                                            Nenhum pet encontrado com os filtros
                                            aplicados.
                                        </div>
                                    )}

                                <div
                                    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
                                    id="petsGrid"
                                >
                                    {petPage &&
                                        petPage.content.map((pet) => (
                                            <ItemList key={pet.id} pet={pet} />
                                        ))}
                                </div>

                                {petPage && petPage.total > 0 && (
                                    <nav
                                        aria-label="Paginação"
                                        className="mt-4"
                                    >
                                        <ul
                                            className="pagination justify-content-center"
                                            id="pagination"
                                        >
                                            <li
                                                className={`page-item ${
                                                    pageInfo.page === 0
                                                        ? "disabled"
                                                        : ""
                                                }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageInfo.page - 1
                                                        )
                                                    }
                                                    disabled={
                                                        pageInfo.page === 0
                                                    }
                                                >
                                                    Anterior
                                                </button>
                                            </li>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => (
                                                    <li
                                                        key={i}
                                                        className={`page-item ${
                                                            pageInfo.page === i
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                )
                                            )}

                                            <li
                                                className={`page-item ${
                                                    pageInfo.page >=
                                                    totalPages - 1
                                                        ? "disabled"
                                                        : ""
                                                }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageInfo.page + 1
                                                        )
                                                    }
                                                    disabled={
                                                        pageInfo.page >=
                                                        totalPages - 1
                                                    }
                                                >
                                                    Próxima
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Resto do código permanece igual (offcanvas, modais, etc.) */}
            </div>
        </div>
    );
}
