import "./itemlist.css";
import type { MyPet } from "../../ts/requisicoes";

interface ItemListProps {
    pet: MyPet;
}

export default function ItemList({ pet }: ItemListProps) {
    const carouselId = `carouselPet-${pet.id}`;
    // src="../../../public/img/dogex.jpg"

    return (
        <div className="col">
            <div className="card h-100">
                <div
                    id={carouselId}
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            {/* Substitua pela URL real da imagem, se tiver */}
                            <img
                                /* mais uma gambiara deliciosa gostou ? */
                                src={`/img/${pet.species}ex.jpg`}
                                className="d-block w-100"
                                alt={pet.name}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{pet.name}</h5>

                    <div className="mb-2">
                        <span className="badge bg-info text-dark me-1">
                            {pet.species}
                        </span>
                        <span className="badge bg-light text-dark">
                            {pet.breed}
                        </span>
                    </div>

                    <p className="card-text text-truncate">
                        Idade: {pet.ageYears} anos · Local: {pet.shelterCity}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <div className="btn-group" role="group">
                            <a
                                className="btn btn-outline-success btn-sm"
                                href={`/detalhe-do-pet/${pet.id}`}
                            >
                                Detalhes
                            </a>
                        </div>
                        <small
                            className="text-muted text-truncate"
                            style={{ marginLeft: 5 }}
                        >
                            ID: {pet.id}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
