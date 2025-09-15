import { useState } from "react";
import type { CidadesBrasil } from "../../ts/requisicoes";

interface DropdownCidadesProps {
    onSelect: (cidade: CidadesBrasil) => void;
}

export default function DropdownCidades({ onSelect }: DropdownCidadesProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Lista completa de cidades brasileiras (capitais + 4 cidades do Paraná)
    const cidadesBrasil: CidadesBrasil[] = [
        // Capitais
        {
            shelterCity: "Rio Branco",
            shelterLat: -9.97499,
            shelterLng: -67.8243,
        },
        { shelterCity: "Maceió", shelterLat: -9.66599, shelterLng: -35.7354 },
        { shelterCity: "Macapá", shelterLat: 0.03485, shelterLng: -51.0664 },
        { shelterCity: "Manaus", shelterLat: -3.11903, shelterLng: -60.0217 },
        { shelterCity: "Salvador", shelterLat: -12.9718, shelterLng: -38.5011 },
        {
            shelterCity: "Fortaleza",
            shelterLat: -3.71839,
            shelterLng: -38.5434,
        },
        { shelterCity: "Brasília", shelterLat: -15.7797, shelterLng: -47.9297 },
        { shelterCity: "Vitória", shelterLat: -20.3155, shelterLng: -40.3128 },
        { shelterCity: "Goiânia", shelterLat: -16.6864, shelterLng: -49.2643 },
        { shelterCity: "São Luís", shelterLat: -2.53874, shelterLng: -44.2825 },
        { shelterCity: "Cuiabá", shelterLat: -15.601, shelterLng: -56.0974 },
        {
            shelterCity: "Campo Grande",
            shelterLat: -20.4422,
            shelterLng: -54.6463,
        },
        {
            shelterCity: "Belo Horizonte",
            shelterLat: -19.9167,
            shelterLng: -43.9345,
        },
        { shelterCity: "Belém", shelterLat: -1.4554, shelterLng: -48.4898 },
        {
            shelterCity: "João Pessoa",
            shelterLat: -7.1195,
            shelterLng: -34.845,
        },
        { shelterCity: "Curitiba", shelterLat: -25.4284, shelterLng: -49.2733 },
        { shelterCity: "Recife", shelterLat: -8.05428, shelterLng: -34.8813 },
        { shelterCity: "Teresina", shelterLat: -5.09201, shelterLng: -42.8038 },
        {
            shelterCity: "Rio de Janeiro",
            shelterLat: -22.9068,
            shelterLng: -43.1729,
        },
        { shelterCity: "Natal", shelterLat: -5.79357, shelterLng: -35.1986 },
        {
            shelterCity: "Porto Alegre",
            shelterLat: -30.0331,
            shelterLng: -51.23,
        },
        {
            shelterCity: "Porto Velho",
            shelterLat: -8.76116,
            shelterLng: -63.9004,
        },
        { shelterCity: "Boa Vista", shelterLat: 2.82351, shelterLng: -60.6758 },
        {
            shelterCity: "Florianópolis",
            shelterLat: -27.5929,
            shelterLng: -48.5528,
        },
        {
            shelterCity: "São Paulo",
            shelterLat: -23.5505,
            shelterLng: -46.6333,
        },
        { shelterCity: "Aracaju", shelterLat: -10.9091, shelterLng: -37.0677 },
        { shelterCity: "Palmas", shelterLat: -10.1844, shelterLng: -48.3337 },

        // Cidades do Paraná
        { shelterCity: "Londrina", shelterLat: -23.2927, shelterLng: -51.1732 },
        { shelterCity: "Maringá", shelterLat: -23.4205, shelterLng: -51.9333 },
        { shelterCity: "Cascavel", shelterLat: -24.9557, shelterLng: -53.4552 },
        {
            shelterCity: "Foz do Iguaçu",
            shelterLat: -25.5469,
            shelterLng: -54.5882,
        },
    ];

    // Filtrar cidades com base no termo de pesquisa
    const filteredCidades = cidadesBrasil.filter((cidade) =>
        cidade.shelterCity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (cidade: CidadesBrasil) => {
        onSelect(cidade);
        setIsDropdownOpen(false);
        setSearchTerm("");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setSearchTerm("");
    };

    return (
        <div className="dropdown">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome da cidade"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                />
                <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    onClick={toggleDropdown}
                >
                    <i
                        className={`bi bi-${isDropdownOpen ? "x" : "geo-alt"}`}
                    ></i>
                </button>
            </div>

            {isDropdownOpen && (
                <div
                    className="dropdown-menu show w-100"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                    {filteredCidades.length > 0 ? (
                        filteredCidades.map((cidade) => (
                            <button
                                key={cidade.shelterCity}
                                type="button"
                                className="dropdown-item selecionadoPorDeus"
                                onClick={() => handleSelect(cidade)}
                            >
                                {cidade.shelterCity}
                            </button>
                        ))
                    ) : (
                        <div className="dropdown-item text-muted">
                            Nenhuma cidade encontrada
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
