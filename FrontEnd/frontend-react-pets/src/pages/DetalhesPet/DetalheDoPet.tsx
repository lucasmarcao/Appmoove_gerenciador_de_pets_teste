import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { MyPet } from "../ts/requisicoes";
import { getPetById } from "../ts/requisicoes";

export default function DetalheDoPet() {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<MyPet | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);

    useEffect(() => {
        if (!id) {
            setErro("ID inválido");
            setCarregando(false);
            return;
        }
        (async () => {
            setCarregando(true);
            const data = await getPetById(id);
            if (!data) {
                setErro("Não foi possível carregar os detalhes do pet.");
            } else {
                setPet(data);
            }
            setCarregando(false);
        })();
    }, [id]);

    const mapSrc = useMemo(() => {
        if (!pet) return "";
        // Google Maps embed sem chave: aponta para o lat/lng
        const q = `${pet.shelterLat},${pet.shelterLng}`;
        // z=14 é um zoom médio; ajuste se quiser
        return `https://www.google.com/maps?q=${encodeURIComponent(
            q
        )}&z=14&output=embed`;
    }, [pet]);

    const formatDate = (d?: Date) =>
        d ? new Date(d).toLocaleString("pt-BR") : "";

    if (carregando) {
        return (
            <div className="container py-4">
                <div className="d-flex align-items-center">
                    <div
                        className="spinner-border me-2"
                        role="status"
                        aria-hidden="true"
                    ></div>
                    <span>Carregando detalhes...</span>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger" role="alert">
                    {erro}
                </div>
                <Link to="/pets" className="btn btn-outline-secondary">
                    Voltar
                </Link>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning">Pet não encontrado.</div>
                <Link to="/pets" className="btn btn-outline-secondary">
                    Voltar
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="h3 mb-0">Detalhes do Pet</h1>
                <Link to="/pets" className="btn btn-outline-secondary btn-sm">
                    Voltar
                </Link>
            </div>
            <hr />

            <div className="row g-4">
                {/* Coluna da imagem e status */}
                <div className="col-12 col-lg-4">
                    <div className="card h-100">
                        <img
                            src={`/img/${pet.species}ex.jpg`}
                            className="card-img-top"
                            alt={pet.name}
                            style={{ objectFit: "cover", height: 240 }}
                        />
                        <div className="card-body">
                            <h2 className="h5 card-title mb-2">{pet.name}</h2>
                            <div className="mb-2">
                                <span className="badge bg-info text-dark me-2">
                                    {pet.species}
                                </span>
                                <span className="badge bg-light text-dark">
                                    {pet.breed}
                                </span>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                <span
                                    className={`badge ${
                                        pet.status === "available"
                                            ? "bg-success"
                                            : "bg-secondary"
                                    }`}
                                >
                                    {pet.status === "available"
                                        ? "Disponível"
                                        : "Adotado"}
                                </span>
                                <span className="badge bg-dark-subtle text-dark">
                                    ID: {pet.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna das informações + mapa */}
                <div className="col-12 col-lg-8">
                    <div className="card h-100">
                        <div className="card-body">
                            <h3 className="h5 mb-3">Informações</h3>
                            <div className="row">
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Idade
                                    </small>
                                    <strong>
                                        {pet.ageYears} ano
                                        {pet.ageYears !== 1 ? "s" : ""}
                                    </strong>
                                </div>
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Espécie
                                    </small>
                                    <strong>{pet.species}</strong>
                                </div>
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Raça
                                    </small>
                                    <strong>{pet.breed}</strong>
                                </div>
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Cidade
                                    </small>
                                    <strong>{pet.shelterCity}</strong>
                                </div>
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Latitude
                                    </small>
                                    <strong>{pet.shelterLat}</strong>
                                </div>
                                <div className="col-6 col-md-4 mb-2">
                                    <small className="text-muted d-block">
                                        Longitude
                                    </small>
                                    <strong>{pet.shelterLng}</strong>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <small className="text-muted d-block">
                                        Criado em
                                    </small>
                                    <strong>{formatDate(pet.createdAt)}</strong>
                                </div>
                            </div>

                            <hr className="my-3" />

                            <h3 className="h5 mb-2">Localização do abrigo</h3>
                            <p className="text-muted mb-3">
                                {pet.shelterCity} — ({pet.shelterLat},{" "}
                                {pet.shelterLng})
                            </p>

                            <div className="ratio ratio-16x9 rounded overflow-hidden">
                                <iframe
                                    title={`Mapa do abrigo de ${pet.name}`}
                                    src={mapSrc}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                />
                            </div>

                            <div className="mt-3 d-flex gap-2">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                        `${pet.shelterLat},${pet.shelterLng}`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    Traçar rota
                                </a>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        `${pet.shelterLat},${pet.shelterLng}`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Abrir no Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
