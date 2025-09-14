import React, {
    useState,
    useEffect,
    useRef,
    type HtmlHTMLAttributes,
    type InputHTMLAttributes,
} from "react";
import { getBreeds } from "../ts/requisicoes";
import type { Breed, BreedPage } from "../ts/requisicoes";
import "./ExploreBreeds.css";

const ExploreBreeds: React.FC = () => {
    const [species, setSpecies] = useState<"dog" | "cat">("dog");
    const [searchName, setSearchName] = useState("");
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        size: 9,
        total: 0,
    });

    // Use ref para controlar a primeira execução do useEffect
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            // gambiara 01
            setSearchName("American");
            fetchBreeds("American");
        } else {
            fetchBreeds();
        }
    }, [species, pageInfo.page, pageInfo.size]);

    const fetchBreeds = async (customSearchTerm?: string) => {
        setLoading(true);
        setError(null);

        try {
            const searchTerm =
                customSearchTerm !== undefined ? customSearchTerm : searchName;
            const breedPage: BreedPage = await getBreeds(
                species,
                searchTerm,
                pageInfo.page,
                pageInfo.size
            );

            setBreeds(breedPage.content);
            setPageInfo((prev) => ({
                ...prev,
                total: breedPage.total,
            }));
        } catch (err) {
            setError("Erro ao carregar raças. Tente novamente.");
            console.error("Erro ao buscar raças:", err);
        } finally {
            setLoading(false);
            setError(null);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPageInfo((prev) => ({ ...prev, page: 0 }));
        fetchBreeds();
    };

    const handleSpeciesChange = (newSpecies: "dog" | "cat") => {
        setSpecies(newSpecies);
        setPageInfo((prev) => ({ ...prev, page: 0 }));
        setSearchName("");
    };

    const handlePageChange = (newPage: number) => {
        setPageInfo((prev) => ({ ...prev, page: newPage }));
    };

    const handleSizeChange = (newSize: number) => {
        setPageInfo((prev) => ({ ...prev, size: newSize, page: 0 }));
    };

    const totalPages = Math.ceil(pageInfo.total / pageInfo.size);

    return (
        <div className="explore-breeds">
            <div className="container">
                <div className="row centro">
                    <div className="col-12 alert alert-info">
                        em vez de escolher o ATRIBUTO 'ENERGIA' eu optei por
                        escolher "String life_span = (String)
                        breed.get("life_span");" , pois o TheAPIdog não possui
                        mais esse item (pensei até que vcs estavam reutilizando
                        o teste), e as duas apis tinham 'life_span' como
                        atributo e isso deixou tudo mais padronizado e bonito.
                    </div>
                </div>
            </div>

            <h1>Explorar Raças</h1>

            <div className="species-selector">
                <button
                    className={species === "dog" ? "active" : ""}
                    onClick={() => handleSpeciesChange("dog")}
                >
                    🐶 Cachorros
                </button>
                <button
                    className={species === "cat" ? "active" : ""}
                    onClick={() => handleSpeciesChange("cat")}
                >
                    🐱 Gatos
                </button>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder={`Buscar raças de ${
                        species === "dog" ? "cachorro" : "gato"
                    }...`}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                    id="inputao"
                />
                <button type="submit" className="search-button">
                    🔍 Buscar
                </button>
            </form>

            <div className="results-info">
                <span>
                    {pageInfo.total} raça{pageInfo.total !== 1 ? "s" : ""}{" "}
                    encontrada{pageInfo.total !== 1 ? "s" : ""}
                </span>
                <select
                    value={pageInfo.size}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="size-selector"
                >
                    <option value={6}>6 por página</option>
                    <option value={9}>9 por página</option>
                    <option value={12}>12 por página</option>
                    <option value={24}>24 por página</option>
                </select>
            </div>

            {loading && <div className="loading">Carregando...</div>}

            {error && <div className="error">{error}</div>}

            {!loading && !error && breeds.length === 0 && (
                <div className="no-results">
                    Nenhuma raça encontrada. Tente uma busca diferente.
                </div>
            )}

            <div className="breeds-grid">
                {breeds.map((breed, index) => (
                    <div key={index} className="breed-card">
                        <div className="breed-image">
                            {breed.image_url ? (
                                <img
                                    src={breed.image_url}
                                    alt={breed.name}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://via.placeholder.com/150?text=Imagem+não+disponível";
                                    }}
                                />
                            ) : (
                                <div className="no-image">
                                    Imagem não disponível
                                </div>
                            )}
                        </div>
                        <div className="breed-info">
                            <h3>{breed.name}</h3>
                            <p>
                                <strong>Origem:</strong>{" "}
                                {breed.origin || "Não informada"}
                            </p>
                            <p>
                                <strong>Expectativa de vida:</strong>{" "}
                                {breed.life_span || "Não informada"}
                            </p>
                            <p>
                                <strong>Temperamento:</strong>{" "}
                                {breed.temperament || "Não informado"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(pageInfo.page - 1)}
                        disabled={pageInfo.page === 0}
                    >
                        ← Anterior
                    </button>

                    <span className="page-info">
                        Página {pageInfo.page + 1} de {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(pageInfo.page + 1)}
                        disabled={pageInfo.page >= totalPages - 1}
                    >
                        Próxima →
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExploreBreeds;
